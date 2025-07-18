// Category Tabs Functionality
document.querySelectorAll('.category-tab').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.category-tab').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    
    // Hide all tab panes
    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.remove('show', 'active');
    });
    
    // Show the corresponding tab pane
    const category = this.getAttribute('data-category');
    const targetPane = document.getElementById(category);
    if (targetPane) {
      targetPane.classList.add('show', 'active');
    }
    // Optional: Filter logic can go here
  });
}); 