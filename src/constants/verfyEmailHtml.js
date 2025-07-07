const htmlContent = function (link, rfLink) {
    const content = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
        <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.1); margin: auto; text-align: center;">
            <h2 style="color: #333;">✅ Welcome to <span style="color: #007bff;">TODOSTACK</span>!</h2>
            <p style="color: #555;">Thanks for signing up! To get started, please verify your email address below.</p>
            
            <a href="${link}" target="_blank" 
               style="display: inline-block; background: #28a745; color: white; padding: 10px 20px; 
               text-decoration: none; border-radius: 5px; font-size: 16px; margin: 20px 0;">
               ✅ Verify Your Email
            </a>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            
            <p style="color: #777;">Didn't get the email? Click below to request a new one.</p>
            
            <a href="${rfLink}" target="_blank" 
               style="display: inline-block; background: #007bff; color: white; padding: 10px 20px; 
               text-decoration: none; border-radius: 5px; font-size: 16px;">
               🔄 Resend Verification Email
            </a>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
                If you didn't sign up for TODOSTACK, feel free to ignore this email.
            </p>
        </div>
    </div>
    `;
    return content;
};
export default htmlContent