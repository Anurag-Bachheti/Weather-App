const Header = () => {
    return (
        <div className="Header">
            <header style={newHeader}>
                <div style={headerLeft}>
                    HOME
                </div>
                <div style={profile}>
                    PROFILE
                    {/* <img alt="Akash" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYgpMSLpWqpjKyuDuMaNw_47dELQPZuD5ZQFWxgUVRWfoOwRoTw5mejiM&s"/> */}
                </div>
            </header>
        </div>
    );
};

const profile = {
    display: 'block',
    marginLeft: 'auto',
    height: 'auto',
    marginTop: '0',
    float: 'right'
};

const headerLeft = {
    float: 'left'
};

const newHeader = {
    color: 'white',
    background: 'black',
    display: 'flex',
    justifyContent:'space-between',
    alignItems: 'center',
    width: '100%',
    position: 'fixed',
    top: 0,
    height: '3%',
    zIndex: '999',
};
  

export default Header;