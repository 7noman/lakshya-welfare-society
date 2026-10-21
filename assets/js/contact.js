/**
 * Lakshya Welfare Society — Accessible Contact & Volunteer Form Handler
 * Validates inputs client-side, enforces WCAG accessibility standards,
 * and provides clear feedback to visitors.
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const nameInput = document.getElementById('fullName');
  const contactInput = document.getElementById('contactValue');
  const subjectInput = document.getElementById('enquiryType');
  const messageInput = document.getElementById('messageText');
  const toastFeedback = document.getElementById('toastFeedback');

  // Real-time blur validation
  if (nameInput) nameInput.addEventListener('blur', () => validateField(nameInput, validateName));
  if (contactInput) contactInput.addEventListener('blur', () => validateField(contactInput, validateContact));
  if (subjectInput) subjectInput.addEventListener('blur', () => validateField(subjectInput, validateSubject));
  if (messageInput) messageInput.addEventListener('blur', () => validateField(messageInput, validateMessage));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput, validateName);
    const isContactValid = validateField(contactInput, validateContact);
    const isSubjectValid = validateField(subjectInput, validateSubject);
    const isMessageValid = validateField(messageInput, validateMessage);

    if (isNameValid && isContactValid && isSubjectValid && isMessageValid) {
      const selectedOption = subjectInput.options[subjectInput.selectedIndex];
      const subjectText = selectedOption ? selectedOption.text : subjectInput.value;

      handleFormSuccess(form, {
        name: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        subject: subjectInput.value,
        subjectText: subjectText,
        message: messageInput.value.trim()
      });
    } else {
      // Focus the first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  function validateField(inputEl, validatorFn) {
    if (!inputEl) return true;
    const errorMsgEl = document.getElementById(`${inputEl.id}-error`);
    const result = validatorFn(inputEl.value.trim());

    if (!result.isValid) {
      inputEl.classList.add('invalid');
      inputEl.setAttribute('aria-invalid', 'true');
      if (errorMsgEl) {
        errorMsgEl.textContent = result.message;
        errorMsgEl.classList.add('visible');
      }
      return false;
    } else {
      inputEl.classList.remove('invalid');
      inputEl.removeAttribute('aria-invalid');
      if (errorMsgEl) {
        errorMsgEl.textContent = '';
        errorMsgEl.classList.remove('visible');
      }
      return true;
    }
  }

  function validateName(val) {
    if (!val) return { isValid: false, message: 'Please enter your full name.' };
    if (val.length < 2) return { isValid: false, message: 'Name must be at least 2 characters.' };
    return { isValid: true };
  }

  function validateContact(val) {
    if (!val) return { isValid: false, message: 'Please provide an email address or mobile phone number.' };
    
    // Check if email or valid phone
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/;
    
    if (!emailPattern.test(val) && !phonePattern.test(val.replace(/[\s\-]/g, ''))) {
      return { isValid: false, message: 'Please enter a valid email address or 10-digit mobile number.' };
    }
    return { isValid: true };
  }

  function validateSubject(val) {
    if (!val || val === '') return { isValid: false, message: 'Please select an enquiry category.' };
    return { isValid: true };
  }

  function validateMessage(val) {
    if (!val) return { isValid: false, message: 'Please write your message or enquiry.' };
    if (val.length < 10) return { isValid: false, message: 'Message must be at least 10 characters long.' };
    return { isValid: true };
  }

  async function handleFormSuccess(formEl, data) {
    const submitBtn = formEl.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
    const recipientEmail = 'drriazahmad16@gmail.com';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;animation:spin 1s linear infinite;display:inline-block;vertical-align:middle;margin-right:6px;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Sending to Dr. Riaz Ahmad...</span>
      `;
    }

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact);

    const payload = {
      name: data.name,
      contact: data.contact,
      category: data.subjectText,
      message: data.message,
      _subject: `[Lakshya Welfare Website] ${data.subjectText} from ${data.name}`,
      _template: 'table',
      _captcha: 'false'
    };

    if (isEmail) {
      payload._replyto = data.contact;
    }

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${recipientEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok || result.success === 'true' || result.success === true) {
        showToast('success', `Thank you, ${data.name}! Your message has been sent directly to founder Dr. Riaz Ahmad (${recipientEmail}).`);
        formEl.reset();
      } else {
        handleFallback(data, recipientEmail);
      }
    } catch (err) {
      handleFallback(data, recipientEmail);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  }

  function handleFallback(data, recipientEmail) {
    const mailtoSubject = encodeURIComponent(`[Lakshya Welfare Website] ${data.subjectText} from ${data.name}`);
    const mailtoBody = encodeURIComponent(`Full Name: ${data.name}\nContact: ${data.contact}\nCategory: ${data.subjectText}\n\nMessage:\n${data.message}`);
    const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    showToast('error', `Automatic forwarder busy. <a href="${mailtoLink}" style="color: #FFFFFF; text-decoration: underline; font-weight: 700;">Click here to send directly via Email</a> to ${recipientEmail}`);
  }

  function showToast(type, message) {
    if (!toastFeedback) return;

    const isSuccess = type === 'success';
    toastFeedback.className = `toast-feedback toast-${type} show`;
    toastFeedback.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${isSuccess 
          ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>'
          : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'
        }
      </svg>
      <div>
        <p style="margin:0;font-weight:600;">${isSuccess ? 'Message Sent' : 'Direct Email Channel'}</p>
        <p style="margin:0;font-size:0.8rem;opacity:0.95;line-height:1.4;">${message}</p>
      </div>
    `;

    setTimeout(() => {
      toastFeedback.classList.remove('show');
    }, 8000);
  }
}
