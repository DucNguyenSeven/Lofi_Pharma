/**
 * Category Dropdown Menu Handler
 * Xử lý menu dropdown nhiều cấp cho sidebar categories
 */

document.addEventListener('DOMContentLoaded', function() {
  // Xử lý dropdown cấp 1 (Sản phẩm)
  const categoryToggles = document.querySelectorAll('.category-toggle');
  
  categoryToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdownCategory = this.closest('.dropdown-category');
      
      if (dropdownCategory) {
        dropdownCategory.classList.toggle('expanded');
      }
    });
  });

  // Xử lý dropdown cấp 2 (Thực phẩm chức năng)
  const subcategoryToggles = document.querySelectorAll('.subcategory-toggle');
  
  subcategoryToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdownSubcategory = this.closest('.dropdown-subcategory');
      
      if (dropdownSubcategory) {
        dropdownSubcategory.classList.toggle('expanded');
      }
    });
  });

  // Đóng tất cả dropdown khi click ra ngoài
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown-category')) {
      const expandedCategories = document.querySelectorAll('.dropdown-category.expanded');
      expandedCategories.forEach(category => {
        category.classList.remove('expanded');
      });
    }
    
    if (!e.target.closest('.dropdown-subcategory')) {
      const expandedSubcategories = document.querySelectorAll('.dropdown-subcategory.expanded');
      expandedSubcategories.forEach(subcategory => {
        subcategory.classList.remove('expanded');
      });
    }
  });


});
