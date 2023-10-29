import "../Assets/Style.scss";

export const DefaultLayout = ({ body }) => {
    return `
        <header>
            <div class="header" >
                <h1><a href="/" data-route>HEADER</a></h1>
            </div>
        </header>
        
        <main>
            <div class="container">
                <div class="title">
                    <h2>Menu</h2>
                    <ul>
                        <li><a href="/" data-route>Trang chủ</a></li>
                        <li><a href="/gioi-thieu" data-route>Giới thiệu</a></li>
                        <li><a href="/san-pham" data-route>Sản phẩm</a></li>
                    </ul>
                </div>
                <div class="info-title">
                    ${body}
                </div>
            </div>
        </main>

        <footer>
            <div class="footer">
                <h2>FOOTER</h2>
            </div>
        </footer>
    `;
};
