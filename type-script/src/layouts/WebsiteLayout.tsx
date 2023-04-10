import React from 'react'
import { Outlet } from 'react-router-dom'
import '../index.css'

const WebsiteLayout = () => {
    
    return (
        <div className='container'>
            <header >
                <div className='logo-banner'>
                <div>ARISTINO</div>
                <nav>
                   <ul className='menu'>
                    <li><a href="http://127.0.0.1:5173"  className="menu">TRANG CHỦ</a></li>
                    <li><a href="http://127.0.0.1:5173/products" className="menu">SẢN PHẨM</a></li>
                    <li><a href="" className="menu">PHỤ KIỆN</a></li>
                    <li><a href="" className="menu">LIÊN HỆ</a></li>
                   </ul>
                </nav>
                <div>
                    <a href='admin'>Admin</a>
                    <a style={{color:"violet"}} href='signup'>đăng kí</a>
                    <a style={{color:"red"}} href='signin'>đăng nhập</a>
                </div>
                </div>
                <div className="banner">
                    <img style={{width:"full"}} src="https://aristino.com/Data/ResizeImage/images/banner/n%C4%83m%202023/t04-2023/Banner-Aristino-slide2-desktop-1920x850x0x0x2.webp" alt="" />
                </div>
            </header>
            <main className='container'>
                < Outlet />
            </main>
            <footer>
                <div className="banner">
                    <img src="https://aristino.com/Data/upload/images/Adv/slide-home-1/he-thong-cua-hang.jpg" alt="" />
                </div>
                <div className='footer-toot'>
                    <div>
                        <h1>VỀ CHÚNG TÔI</h1>
                        <p>Câu chuyện thương hiệu</p>
                        <p>Đôi Cánh Yêu Thương</p>
                        <p>Tin tức</p>
                        <p>Tuyển dụng</p>
                        <p>Liên hệ</p>
                    </div>
                    <div>
                    <h1>CHÍNH SÁCH BÁN HÀNG</h1>
                        <p>Chính sách đổi hàng</p>
                        <p>Chính sách bảo hành</p>
                        <p>Chính sách hội viên</p>
                        <p>Chính sách giao nhận</p>
                        <p>Hướng dẫn mua hàng</p>
                        <p>Chính sách bảo mật</p>
                    </div>
                    <div>
                    <h1>TƯ VẤN</h1>
                        <p>Tư vấn phong cách</p>
                        <p>Tư vấn chọn size</p>
                        <p>Hỏi đáp</p>
                    </div>
                    <div>
                    <h1>THEO DÕI BẢN TIN CỦA CHÚNG TÔI</h1>
                        <p>Tư vấn phong cách</p>
                    </div>
                    </div>

            </footer>
        </div>
    )
}

export default WebsiteLayout