// mobileNotif.js

document.addEventListener('DOMContentLoaded', () => {
  // Function to check if the user is in Mobile mode
  const isMobileMode = () => {
    // Check user agent for common mobile devices
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Check screen width (optional, for additional confirmation)
    const isSmallScreen = window.innerWidth <= 768; // Adjust the threshold as needed

    // Return true if either condition is met
    return isMobileUserAgent || isSmallScreen;
  };

  // Check if the user is in Mobile mode
  if (isMobileMode()) {
    // Create a custom notification
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '10px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.width = '75%';  // Set a wider width for the notification
    notification.style.backgroundColor = '#f8d7da';
    notification.style.color = '#721c24';
    notification.style.padding = '15px';
    notification.style.borderRadius = '5px';
    notification.style.zIndex = '1000';
    notification.style.textAlign = 'center';  // Align the text in the center
    notification.innerHTML = `
      <strong>You are in Mobile mode</strong><br>
      • In your browser settings, turn on "Desktop site" to enjoy listening in the background, even when your screen is off. Enjoy listening! ☺️
    `;

    // Create the close button
const closeBtn = document.createElement('button');
closeBtn.textContent = '[✕]';  //[×][✕][⨉]
closeBtn.style.position = 'absolute !important';
closeBtn.style.top = '5px !important';
closeBtn.style.right = '5px !important';
closeBtn.style.background = '#00000000 !important'; // Transparent background
closeBtn.style.border = 'none !important';
closeBtn.style.fontSize = '18px !important';
closeBtn.style.cursor = 'pointer !important';
closeBtn.style.color = '#721c24 !important';
closeBtn.style.borderRadius = '0 !important'; // Override any border-radius from global styles
closeBtn.style.boxShadow = 'none !important'; // Remove any box shadow
closeBtn.style.padding = '0 !important'; // Remove padding
closeBtn.style.transition = 'none !important'; // Disable transitions

    // Close button click event to remove the notification
    closeBtn.addEventListener('click', () => {
      notification.remove();
    });

    // Append the close button to the notification
    notification.appendChild(closeBtn);

    // Append the notification to the body
    document.body.appendChild(notification);
  }
});
