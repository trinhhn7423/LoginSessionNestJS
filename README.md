*** Class-validator

@IsnotEmpty() dùng để kiểm tra giá trị của thuộc tính có rỗng không (null, undefined, hoặc chuỗi trống).
@IsOptional() có nghĩa là thuộc tính có thể không có giá trị  
@IsInt({ each: true }) each là một tùy chọn , áp dụng cho mỗi phần tử trong mảng , ở vd kiểm tra phần tử trong mảng có
phải là số hay không
@Min(1) giá trị bé nhất là 1

@Transform()
là một decorator từ class-transformer, cho phép chuyển đổi giữ liệu trước khi nó được sử dụng trong server

// các trường trạng thái nên được lưu dưới dạng tinyid(số nguyên nhỏ ) để tối ưu truy vấn database
tránh sử dụng magic number  ( là các giá trị số được sử dụng trực tiếp trong mã mà k có sự giải thích rõ ràng )
// hạn chế sử dụng raw query
Raw query là các câu truy vấn SQL được viết trựcc tiếp trong mã nguồn mà không thông qua ORM
Khuyến khích sử dụng QueryBuilder hoặc Repository
là các công cụ ORM để giúp xây dựng các truy vấn linh hoạt và an toàn mà không cần viết câu truy vấn SQL trực tiếp ,
giúp đảm bảo tính nhất quán

****HTTP Methods
GET → Lấy dữ liệu
POST → Tạo mới tài nguyên
PUT → Cập nhật toàn bộ tài nguyên
PATCH → Cập nhật một phần tài nguyên
DELETE → Xóa tài nguyên

***Mã Trạng Thái HTTP
200 OK Thành công
201 Created Tạo tài nguyên thành công
204 No Content Thành công nhưng không có nội dung trả về
400 Bad Request Request sai định dạng
401 Unauthorized Chưa xác thực (cần đăng nhập)
403 Forbidden Không có quyền truy cập
404 Not Found Không tìm thấy tài nguyên
500 Internal Server Error Lỗi từ server

Router dùng danh từ số nhiều (/users, /products).
Controller dùng danh từ số ít (UserController, ProductController).
Phương thức trong Controller đặt theo hành động (getAllUsers(), createUser()).
Không dùng động từ trong URL (GET /users thay vì GET /getUsers).

Trường dữ liệu nên đặt theo kiểu camelCase.

GET /users Trả về danh sách user
GET /users/{id} Lấy thông tin user có id
POST /users Tạo mới user
PUT /users/{id} Cập nhật toàn bộ user có id
PATCH /users/{id} Cập nhật một phần user có id
DELETE /users/{id} Xóa user

***Sử dụng sub-resource khi cần
GET /users/{id}/posts (lấy bài viết của user)
GET /products/{id}/reviews (lấy đánh giá của sản phẩm)

trả về các lỗi
BadRequestException
UnauthorizedException
NotFoundException
ForbiddenException
NotAcceptableException
RequestTimeoutException
ConflictException
GoneException
HttpVersionNotSupportedException
PayloadTooLargeException
UnsupportedMediaTypeException
UnprocessableEntityException
InternalServerErrorException
NotImplementedException
ImATeapotException
MethodNotAllowedException
BadGatewayException
ServiceUnavailableException
GatewayTimeoutException
PreconditionFailedException



nhân viên có nhiều vai trò 
khi đăng ký thành công role là customer
Department ///



