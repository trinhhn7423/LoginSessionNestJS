
*** Class-validator

@IsnotEmpty() dùng để kiểm tra giá trị của thuộc tính có rỗng không (null, undefined, hoặc chuỗi trống).
@IsOptional() có nghĩa là thuộc tính có thể không có giá trị  
@IsInt({ each: true }) each là một tùy chọn , áp dụng cho mỗi phần tử trong mảng , ở vd kiểm tra phần tử trong mảng có phải là số hay không 
@Min(1) giá trị bé nhất là 1 


@Transform()
là một decorator từ class-transformer, cho phép chuyển đổi giữ liệu trước khi nó được sử dụng trong server 

// các trường trạng thái nên được lưu dưới dạng tinyid(số nguyên nhỏ ) để tối ưu truy vấn database
 tránh sử dụng magic number  ( là các giá trị số được sử dụng trực tiếp trong mã mà k có sự giải thích rõ ràng )
// hạn chế sử dụng raw query 
Raw query là các câu truy vấn SQL được viết trựcc tiếp trong mã nguồn mà không thông qua ORM 
Khuyến khích sử dụng QueryBuilder hoặc Repository
    là các công cụ ORM để giúp xây dựng các truy vấn linh hoạt và an toàn mà không cần viết câu truy vấn SQL trực tiếp , giúp đảm bảo tính nhất quán 
