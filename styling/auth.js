document.addEventListener('DOMContentLoaded', function() {
  // Function to create and show password modal
  function showPasswordModal(targetUrl) {
    // Create modal HTML
    const modal = document.createElement('div');
    modal.id = 'password-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    `;
    
    modal.innerHTML = `
      <div style="
        background: white;
        padding: 30px;
        border-radius: 8px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      ">
        <h3 style="margin-bottom: 20px; color: #333;">🔒 Protected Content</h3>
        <p style="margin-bottom: 20px; color: #666;">This tutorial requires a passcode to access.</p>
        <div style="margin-bottom: 20px;">
          <input type="password" id="modal-password" placeholder="Enter passcode..." style="
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            font-size: 16px;
            margin-bottom: 10px;
          ">
          <div id="modal-error" style="display: none; color: red; font-size: 14px;">
            Incorrect passcode. Please try again.
          </div>
        </div>
        <div style="display: flex; gap: 10px; justify-content: center;">
          <button onclick="validatePassword('${targetUrl}')" style="
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          ">Access</button>
          <button onclick="closeModal()" style="
            padding: 10px 20px;
            background-color: #6c757d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          ">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Focus on password input
    document.getElementById('modal-password').focus();
    
    // Add Enter key support
    document.getElementById('modal-password').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        validatePassword(targetUrl);
      }
    });
  }
  
  // Function to validate password
  window.validatePassword = function(targetUrl) {
    const password = document.getElementById('modal-password').value;
    const correctPassword = 'REDACTED';
    
    if (password === correctPassword) {
      // Store authentication and redirect
      sessionStorage.setItem('auth', 'true');
      window.location.href = targetUrl;
    } else {
      // Show error
      document.getElementById('modal-error').style.display = 'block';
      document.getElementById('modal-password').value = '';
      document.getElementById('modal-password').focus();
    }
  };
  
  // Function to close modal
  window.closeModal = function() {
    const modal = document.getElementById('password-modal');
    if (modal) {
      modal.remove();
    }
  };
  
  // Wait for the listing to load, then attach event listeners
  setTimeout(function() {
    const links = document.querySelectorAll('a[href*="08_dynata_tutorial"]');
    links.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        showPasswordModal(link.href);
      });
    });
  }, 1000);
});