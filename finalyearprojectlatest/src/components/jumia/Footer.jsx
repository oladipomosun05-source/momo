const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#313133', color: '#fff', padding: '40px 0', marginTop: '40px' }}>
            <div className="container grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                <div>
                    <h4 style={{ marginBottom: '20px' }}>LET US HELP YOU</h4>
                    <ul style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#ccc' }}>
                        <li>Help Center</li>
                        <li>How to shop with us?</li>
                        <li>Delivery options and timelines</li>
                        <li>How to return a product?</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px' }}>ABOUT US</h4>
                    <ul style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#ccc' }}>
                        <li>About us</li>
                        <li>Careers</li>
                        <li>Express Delivery</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy Notice</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px' }}>MAKE MONEY WITH US</h4>
                    <ul style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#ccc' }}>
                        <li>Sell with us</li>
                        <li>Become a Logistics Service Partner</li>
                        <li>City Partner Program</li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '20px' }}>INTERNATIONAL</h4>
                    <ul style={{ fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '8px', color: '#ccc' }}>
                        <li>Algeria | Egypt | Ghana | Ivory Coast</li>
                        <li>Kenya | Morocco | Senegal | Tunisia | Uganda</li>
                    </ul>
                </div>
            </div>
            <div style={{ textAlign: 'center', borderTop: '1px solid #444', marginTop: '40px', paddingTop: '20px', fontSize: '12px', color: '#757575' }}>
                © 2026 ECOMMERCE - Built for Final Year Project (Data Privacy Monitoring Framework)
            </div>
        </footer>
    );
};

export default Footer;
