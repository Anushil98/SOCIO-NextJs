import Link from 'next/link';
export const MainLayout = (props) => {
    return (
        <div className="MainLayout">
            <div className="NavBar"><div>SkillIt</div><div><Link href="/HomePage"><a>Home</a></Link></div></div>
            <div className="ContentArea">
                <div className="leftSideBar">{props.leftSideBar}</div>
                <div className="Middle" id="MidArea">{props.Middle}</div>
                <div className="rightSideBar">{props.rightSideBar}</div>
            </div>
        </div>
    )
}