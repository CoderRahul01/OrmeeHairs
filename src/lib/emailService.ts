import { Resend } from 'resend';

// Initialize the Resend client
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export interface EmailParams {
  to: {
    email: string;
    name?: string;
  }[];
  subject: string;
  htmlContent?: string;
  templateId?: number; // Kept for backward compatibility
  params?: Record<string, any>; // Kept for backward compatibility
  sender?: {
    email: string;
    name: string;
  };
  replyTo?: {
    email: string;
    name?: string;
  };
  attachments?: {
    filename: string;
    content: Buffer;
  }[];
}

/**
 * Send an email using Resend
 * @param params Email parameters
 * @returns Promise that resolves when email is sent
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  // If API is not initialized, log warning and return
  if (!resend) {
    console.warn('Email service not initialized. Check RESEND_API_KEY environment variable.');
    
    // In development, log the email that would have been sent
    if (process.env.NODE_ENV === 'development') {
      console.log('Would have sent email:');
      console.log('To:', params.to.map(recipient => `${recipient.name || ''} <${recipient.email}>`).join(', '));
      console.log('Subject:', params.subject);
      console.log('HTML Content:', params.htmlContent?.substring(0, 150) + '...');
      if (params.templateId) {
        console.log('Note: templateId is not supported in Resend. Using htmlContent instead.');
      }
    }
    
    return false;
  }

  try {
    const defaultSender = {
      email: process.env.RESEND_DEFAULT_SENDER_EMAIL || 'noreply@ormeehair.com',
      name: process.env.RESEND_DEFAULT_SENDER_NAME || 'Ormee Hair',
    };

    // Format recipients
    const to = params.to.map(recipient => {
      if (recipient.name) {
        return `${recipient.name} <${recipient.email}>`;
      }
      return recipient.email;
    });

    // Create email data object
    const emailData: any = {
      from: params.sender 
        ? `${params.sender.name} <${params.sender.email}>` 
        : `${defaultSender.name} <${defaultSender.email}>`,
      to,
      subject: params.subject,
    };

    // Set HTML content
    if (params.htmlContent) {
      emailData.html = params.htmlContent;
    }

    // Set reply-to if provided
    if (params.replyTo) {
      emailData.reply_to = params.replyTo.name 
        ? `${params.replyTo.name} <${params.replyTo.email}>`
        : params.replyTo.email;
    }

    // Set attachments if provided
    if (params.attachments && params.attachments.length > 0) {
      emailData.attachments = params.attachments.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content,
      }));
    }
    
    // Send the email
    const { data, error } = await resend.emails.send(emailData);
    
    if (error) {
      console.error('Error sending email:', error);
      return false;
    }
    
    console.log('Email sent successfully. ID:', data?.id);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 