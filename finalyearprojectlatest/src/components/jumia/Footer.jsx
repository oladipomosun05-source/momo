const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: '#313133',
                color: '#fff',
                padding: '50px 20px 30px',
                marginTop: '40px'
            }}
        >
            {/* Main Footer */}
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '30px'
                }}
            >
                {/* Column 1 */}
                <div>
                    <h4
                        style={{
                            marginBottom: '18px',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    >
                        LET US HELP YOU
                    </h4>

                    <ul
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            color: '#cfcfcf',
                            lineHeight: '1.6'
                        }}
                    >
                        <li>Help Center</li>
                        <li>How to shop with us?</li>
                        <li>Delivery options and timelines</li>
                        <li>How to return a product?</li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h4
                        style={{
                            marginBottom: '18px',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    >
                        ABOUT US
                    </h4>

                    <ul
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            color: '#cfcfcf',
                            lineHeight: '1.6'
                        }}
                    >
                        <li>About us</li>
                        <li>Careers</li>
                        <li>Express Delivery</li>
                        <li>Terms and Conditions</li>
                        <li>Privacy Notice</li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h4
                        style={{
                            marginBottom: '18px',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    >
                        MAKE MONEY WITH US
                    </h4>

                    <ul
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            color: '#cfcfcf',
                            lineHeight: '1.6'
                        }}
                    >
                        <li>Sell with us</li>
                        <li>
                            Become a Logistics Service Partner
                        </li>
                        <li>City Partner Program</li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h4
                        style={{
                            marginBottom: '18px',
                            fontSize: '15px',
                            fontWeight: '700'
                        }}
                    >
                        INTERNATIONAL
                    </h4>

                    <ul
                        style={{
                            fontSize: '13px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            color: '#cfcfcf',
                            lineHeight: '1.6'
                        }}
                    >
                        <li>
                            Algeria | Egypt | Ghana |
                            Ivory Coast
                        </li>

                        <li>
                            Kenya | Morocco | Senegal |
                            Tunisia | Uganda
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Footer */}
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '40px auto 0',
                    borderTop: '1px solid #444',
                    paddingTop: '20px',
                    textAlign: 'center',
                    fontSize: '12px',
                    color: '#9ca3af',
                    lineHeight: '1.6'
                }}
            >
                © 2026 ECOMMERCE — Built for Final Year
                Project (Data Privacy Monitoring Framework)
            </div>
        </footer>
    );
};

export default Footer;