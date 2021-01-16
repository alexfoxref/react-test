import React, { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from '../'
import { authActions } from '../../store/actions/authActions'
import styles from './Navbar.module.scss'

const Navbar = ({ isAuthorization, url }) => {
  const pathname = url?.pathname
  const dispatch = useDispatch()

  const logoutHandler = useCallback(() => {
    dispatch(authActions.logout())
  }, [dispatch])

  const links = useMemo(() => {
    return [
      {
        to: '/',
        title: 'Список задач',
      },
      {
        to: '/create',
        title: 'Создать задачу',
      },
      {
        to: isAuthorization ? '/' : '/auth',
        title: isAuthorization ? 'Выход' : 'Авторизация',
      },
    ].map((link, idx, links) => ({
      ...link,
      activeClass:
        pathname !== link.to || idx === links.length - 1 ? '' : 'active',
      id: `nav-link-${idx}`,
      action: idx === links.length - 1 ? logoutHandler : null,
    }))
  }, [pathname, isAuthorization, logoutHandler])

  return (
    <nav className={styles.navbar}>
      <div className='nav-wrapper'>
        <NavLink to='/' className='brand-logo'>
          Logo
        </NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          {links.map(({ id, to, title, activeClass, action }) => (
            <li className={activeClass} key={id}>
              <NavLink to={to} action={action}>
                {title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
