import React from 'react';

function Menu({ handleMenuClick }) {
    return (
        <div id="menu" style={{ width: '200px', background: '#333', color: '#fff' }}>
            <div style={{ padding: '20px' }}>
                <div style={{ padding: '10px 0' }}>
                    <a href="#page1" onClick={() => handleMenuClick('page1')} style={{ color: '#fff', textDecoration: 'none' }}>Page 1</a>
                </div>
                <div style={{ padding: '10px 0' }}>
                    <a href="#page2" onClick={() => handleMenuClick('page2')} style={{ color: '#fff', textDecoration: 'none' }}>Page 2</a>
                </div>
                <div style={{ padding: '10px 0' }}>
                    <a href="#page3" onClick={() => handleMenuClick('page3')} style={{ color: '#fff', textDecoration: 'none' }}>Page 3</a>
                </div>
            </div>
        </div>
    );
}

export default Menu;
