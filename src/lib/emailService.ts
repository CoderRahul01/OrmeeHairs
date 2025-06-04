import * as SibApiV3Sdk from 'sib-api-v3-sdk';

// Initialize the Brevo (Sendinblue) API client
let apiInstance: any = null;
apiInstance = new (SibApiV3Sdk as any).TransactionalEmailsApi();

// Initialize the API only if API key is available
if (process.env.BREVO_API_KEY) {
  const defaultClient = SibApiV3Sdk.ApiClient.instance;
  const apiKey = defaultClient.authentications['api-key'];
  apiKey.apiKey = process.env.BREVO_API_KEY;
  apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
}

export interface EmailParams {
  to: {
    email: string;
    name?: string;
  }[];
  subject: string;
  htmlContent?: string;
  templateId?: number;
  params?: Record<string, any>;
  sender?: {
    email: string;
    name: string;
  };
}

/**
 * Send an email using Brevo (Sendinblue)
 * @param params Email parameters
 * @returns Promise that resolves when email is sent
 */
export async function sendEmail(params: EmailParams): Promise<boolean> {
  // If API is not initialized, log warning and return
  if (!apiInstance) {
    console.warn('Email service not initialized. Check BREVO_API_KEY environment variable.');
    
    // In development, log the email that would have been sent
    if (process.env.NODE_ENV === 'development') {
      console.log('Would have sent email:');
      console.log('To:', params.to.map(recipient => `${recipient.name || ''} <${recipient.email}>`).join(', '));
      console.log('Subject:', params.subject);
      console.log('Template ID:', params.templateId);
      console.log('HTML Content:', params.htmlContent?.substring(0, 150) + '...');
      console.log('Params:', params.params);
    }
    
    return false;
  }

  try {
    // Create send email request
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    
    // Set recipients
    sendSmtpEmail.to = params.to;
    
    // Set subject
    sendSmtpEmail.subject = params.subject;
    
    // Set sender
    sendSmtpEmail.sender = params.sender || {
      email: process.env.BREVO_DEFAULT_SENDER_EMAIL || 'noreply@ormeehair.com',
      name: process.env.BREVO_DEFAULT_SENDER_NAME || 'Ormee Hair',
    };
    
    // Set HTML content or template
    if (params.templateId) {
      sendSmtpEmail.templateId = params.templateId;
      
      if (params.params) {
        sendSmtpEmail.params = params.params;
      }
    } else if (params.htmlContent) {
      sendSmtpEmail.htmlContent = params.htmlContent;
    }
    
    // Send the email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Email sent successfully. Message ID:', data.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
} 