const otpEmailContent = (otp) => {
    return `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f2f5; padding: 40px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);">
      
      <h1 style="color: #2d3436; text-align: center;">🔐 TODOSTACK</h1>
      <h3 style="color: #2c3e50; text-align: center;">Your OTP Code</h3>
      
      <p style="font-size: 16px; color: #636e72; text-align: center;">
        Use the code below to verify your action. This OTP is valid for a limited time only.
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <span style="
          font-size: 32px;
          font-weight: bold;
          color: #0984e3;
          background: #dfe6e9;
          padding: 12px 30px;
          border-radius: 10px;
          display: inline-block;
          letter-spacing: 4px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size: 14px; color: #b2bec3; text-align: center;">
        If you didn’t request this code, please ignore this email.
      </p>

      <hr style="margin: 40px 0; border: none; border-top: 1px solid #dfe6e9;">

      <p style="font-size: 12px; color: #b2bec3; text-align: center;">
        © ${new Date().getFullYear()} TODOSTACK. All rights reserved. <br>
        This is an automated message, please do not reply.
      </p>
    </div>
  </div>
  `;
};

export default otpEmailContent;
