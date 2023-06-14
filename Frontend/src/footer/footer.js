import './footer.css'
import {AiFillGithub} from 'react-icons/ai'
import {FiMail} from 'react-icons/fi'

const Footer = () =>{
    return (
        <footer className="footer">
            <div className="contents">
                <h2 className='title'></h2>
                <ul className='social-icons'>
                    {social.map((socialIcon) => {
                    const { id, url, icon } = socialIcon;
                return (
                    <li key={id}>
                        <a href={url}>{icon}</a>
                    </li>
                );
                })}
                </ul>
            </div>
        </footer>
    )
}

export const social = [
    {
      id: 1,
      url: 'https://github.com/TUK-OJ-graduation-project',
      icon: <AiFillGithub />,
    },

    {
      id: 2,
      url: '',
      icon:<FiMail />,
    }
  ]

export default Footer