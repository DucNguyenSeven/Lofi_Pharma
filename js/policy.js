// Policy Data Structure
const policyData = {
  delivery: {
    title: "Chính sách giao hàng",
    breadcrumb: "Chính sách giao hàng",
    content: `
      <p class="policy-text mb-4">
        Lofi Pharma có dịch vụ giao hàng tận nơi trên toàn quốc, áp dụng cho khách mua hàng trên website, fanpage và gọi điện thoại, không áp dụng cho khách mua trực tiếp tại cửa hàng.
      </p>
      
      <p class="policy-text mb-4">
        Đơn hàng sẽ được chuyển phát đến tận địa chỉ khách hàng cung cấp thông qua công ty vận chuyển trung gian.
      </p>

      <h2 class="policy-content-title mb-4">1. Thời gian giao hàng</h2>
      
      <h3 class="policy-subtitle mb-3">Đối với đơn hàng nội và ngoại thành Hà Nội:</h3>
      <ul class="policy-list mb-4">
        <li>Thời gian giao hàng là 1-2 ngày sau khi đặt hàng.</li>
        <li>Đơn hàng trước 11h30 trưa thì sẽ giao trong buổi chiều cùng ngày.</li>
        <li>Đơn hàng sau 11h30 sẽ giao trong buổi tối và sáng hôm sau.</li>
      </ul>

      <h3 class="policy-subtitle mb-3">Đối với đơn hàng ở các tỉnh thành khác:</h3>
      <ul class="policy-list mb-4">
        <li>Thời gian là 2-3 ngày đối với khu vực trung tâm tỉnh thành phố.</li>
        <li>Thời gian là 3-7 ngày đối với khu vực ngoại thành, huyện, xã, thị trấn...</li>
        <li>(Không tính thứ bảy, chủ nhật hay các ngày lễ tết).</li>
      </ul>

      <h3 class="policy-subtitle mb-3">Quy định chung về xử lý đơn hàng:</h3>
      <ul class="policy-list mb-4">
        <li>Thời gian xử lý đơn hàng sẽ được tính từ khi nhận được thanh toán hoàn tất của quý khách.</li>
        <li>Có thể thay đổi thời gian giao hàng nếu khách hàng yêu cầu và Lofi Pharma chủ động đổi trong trường hợp chịu ảnh hưởng của thiên tai hoặc các sự kiện đặc biệt khác.</li>
        <li>Đơn hàng của quý khách sẽ được giao tối đa trong 2 lần. Trường hợp lần đầu giao hàng không thành công, sẽ có nhân viên liên hệ để sắp xếp lịch giao hàng lần 2 với quý khách, trong trường hợp vẫn không thể liên lạc lại được hoặc không nhận được bất kì phản hồi nào từ phía quý khách, đơn hàng sẽ không còn hiệu lực.</li>
        <li>Để kiểm tra thông tin hoặc tình trạng đơn hàng của quý khách, xin vui lòng inbox fanpage hoặc gọi số hotline, cung cấp tên, số điện thoại để được kiểm tra.</li>
        <li>Khi hàng được giao đến quý khách, vui lòng ký xác nhận với nhân viên giao hàng và kiểm tra lại số lượng cũng như loại hàng hóa được giao có chính xác không. Xin quý khách vui lòng giữ lại biên lại vận chuyển và hóa đơn mua hàng để đối chiếu kiểm tra.</li>
      </ul>

      <h2 class="policy-content-title mb-4">2. Phí giao hàng</h2>
      <ul class="policy-list mb-4">
        <li>Phí ship cố định là 30,000đ áp dụng cho mọi khu vực</li>
      </ul>
    `
  },
  
  return: {
    title: "Chính sách đổi trả",
    breadcrumb: "Chính sách đổi trả",
    content: `
      <h2 class="policy-content-title mb-4">1. Điều kiện đổi trả</h2>
      <ul class="policy-list mb-4">
        <li>Sản phẩm bị sai loại, sai model so với đơn hàng</li>
        <li>Sản phẩm bị thiếu số lượng so với đơn hàng</li>
        <li>Sản phẩm bị hư hỏng bên ngoài như rách bao bì, bong tróc, vỡ...</li>
      </ul>

      <h2 class="policy-content-title mb-4">2. Quy định về thời gian thông báo và gửi sản phẩm đổi trả</h2>
      <p class="policy-text mb-4">
        Khách hàng có trách nhiệm cung cấp đầy đủ các giấy tờ liên quan đến sản phẩm cần đổi trả và thông báo trong thời gian sớm nhất có thể.
      </p>
      
      <p class="policy-text mb-4">
        Nếu quý khách có bất kỳ phản hồi hoặc khiếu nại nào, vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ tốt nhất.
      </p>
    `
  },
  
  sales: {
    title: "Chính sách bán hàng",
    breadcrumb: "Chính sách bán hàng",
    content: `
      <h2 class="policy-content-title mb-4">Đặt hàng</h2>
      <p class="policy-text mb-4">
        Khách hàng có thể đến các cửa hàng Lofi Pharma hoặc đặt hàng qua điện thoại.
      </p>
      
      <ul class="policy-list mb-4">
        <li>Đặt hàng trực tiếp tại cửa hàng</li>
        <li>Đặt hàng trực tuyến</li>
        <li>Đặt hàng qua hotline: 0987654321</li>
      </ul>

      <h2 class="policy-content-title mb-4">Xác Nhận Đơn Hàng</h2>
      <p class="policy-text mb-4">
        Thông tin do khách hàng cung cấp sẽ được sử dụng để xác nhận đơn hàng.
      </p>

      <h2 class="policy-content-title mb-4">Thay Đổi, Hủy Bỏ Giao Dịch tại</h2>
      <p class="policy-text mb-4">
        Khách hàng có quyền hủy đơn hàng và thông báo qua hotline 0987654321.
      </p>

      <h2 class="policy-content-title mb-4">Chương Trình Ưu Đãi</h2>
      <p class="policy-text mb-4">
        Lofi Pharma thường xuyên có các chương trình giảm giá dành cho khách hàng vào các thời điểm khác nhau.
      </p>
    `
  },
  
  membership: {
    title: "Chính sách thành viên",
    breadcrumb: "Chính sách thành viên",
    content: `
      <h2 class="policy-content-title mb-4">Điều kiện chính sách thành viên</h2>
      
      <h3 class="policy-subtitle mb-3">1. Thẻ thành viên</h3>
      <p class="policy-text mb-4">
        Điều kiện cấp thẻ thành viên: Khi khách hàng mua hàng trên hệ thống Lofi sẽ được cấp thẻ thành viên.
      </p>

      <h3 class="policy-subtitle mb-3">2. Thẻ VIP</h3>
      <p class="policy-text mb-4">Điều kiện nhận thẻ VIP:</p>
      <ul class="policy-list mb-4">
        <li>+ Có giá trị tổng đơn hàng lớn hơn 15 triệu/ tháng</li>
        <li>+ Mua hàng với giá trị 3 triệu trở lên</li>
        <li>+ Tham gia các hoạt động, chương trình khuyến mãi của Dola</li>
      </ul>

      <div class="policy-note">
        <strong>Lưu ý:</strong> Hạn mức 10, 20, 30, 50, 100 triệu đồng là tính từ thời điểm bắt đầu mua tới khi lên thẻ. Khi lên thẻ VIP và tích tiếp lên 20 đến 100 triệu, tổng tiền này là tính từ khi khách hàng mua lần đầu và cộng dồn lên.
      </div>
    `
  },
  
  privacy: {
    title: "Bảo mật thông tin cá nhân",
    breadcrumb: "Bảo mật thông tin cá nhân",
    content: `
      <h2 class="policy-content-title mb-4">1. Thu thập thông tin cá nhân</h2>
      <p class="policy-text mb-4">
        Chúng tôi thu thập các thông tin cá nhân như: họ tên, giới tính, ngày sinh, email, địa chỉ, số điện thoại, fax, thông tin thanh toán, thông tin tài khoản ngân hàng...
      </p>
      
      <h3 class="policy-subtitle mb-3">Mục đích sử dụng:</h3>
      <ul class="policy-list mb-4">
        <li>Xử lý đơn hàng và cung cấp dịch vụ</li>
        <li>Quản lý tài khoản người dùng</li>
        <li>Thực hiện giao dịch trực tuyến</li>
        <li>Nghiên cứu thống kê nhân khẩu học</li>
        <li>Gửi thông tin khuyến mãi (có thể từ chối)</li>
      </ul>

      <h2 class="policy-content-title mb-4">2. Bảo mật</h2>
      <p class="policy-text mb-4">
        Chúng tôi áp dụng các biện pháp kỹ thuật và bảo mật để bảo vệ thông tin của bạn khỏi việc truy cập trái phép, mất mát hoặc hư hỏng.
      </p>
      
      <div class="policy-note">
        <strong>Lưu ý:</strong> Không gửi thông tin thanh toán nhạy cảm qua email. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất nào phát sinh từ việc này.
      </div>

      <h2 class="policy-content-title mb-4">3. Quyền lợi khách hàng</h2>
      <p class="policy-text mb-4">
        Bạn có quyền truy cập và sửa đổi dữ liệu cá nhân của mình miễn phí. Bạn cũng có thể yêu cầu dừng việc sử dụng dữ liệu cá nhân cho mục đích tiếp thị bất cứ lúc nào.
      </p>
    `
  }
};

// Function to load policy content based on URL parameter
function loadPolicyContent() {
  // Get policy parameter from URL
  const urlParams = new URLSearchParams(window.location.search);
  const policy = urlParams.get('policy') || 'delivery';
  
  // Get policy data
  const policyInfo = policyData[policy];
  if (!policyInfo) return;
  
  // Update title and breadcrumb
  document.getElementById('policyTitle').textContent = policyInfo.title;
  document.getElementById('breadcrumbText').textContent = policyInfo.breadcrumb;
  
  // Update content
  document.getElementById('policyContent').innerHTML = policyInfo.content;
  
  // Update page title
  document.title = `${policyInfo.title} - Lofi Pharma`;
}

// Load content when page loads
document.addEventListener('DOMContentLoaded', loadPolicyContent);
