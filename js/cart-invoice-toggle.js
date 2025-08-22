document.addEventListener('DOMContentLoaded', function() {
  const companyInvoiceCheckbox = document.getElementById('company-invoice');
  const companyInvoiceFields = document.getElementById('companyInvoiceFields');
  
  if (companyInvoiceCheckbox && companyInvoiceFields) {
    companyInvoiceCheckbox.addEventListener('change', function() {
      if (this.checked) {
        companyInvoiceFields.style.display = 'block';
        companyInvoiceFields.style.animation = 'slideDown 0.3s ease-out';
      } else {
        companyInvoiceFields.style.animation = 'slideUp 0.3s ease-out';
        setTimeout(() => {
          companyInvoiceFields.style.display = 'none';
        }, 300);
      }
    });
  }
});
