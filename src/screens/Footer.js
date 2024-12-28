function Footer() {
    return (
        <div style = {newfooter}>
            <footer>
                Notice - Planning for a trip!! Do check before your trip begins.
            </footer>
        </div>
    );
}

const newfooter = {
    position:'fixed',
    width: '100%',
    bottom: '0',
    color: 'white',
    backgroundColor: 'black',
    alignContent: 'end',
    textAlign: 'center',
};

export default Footer;