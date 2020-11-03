import React from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux'

import './index.scss';
const Header = (props: any) => {
	console.log(props)
	const {dispatch} = props
    const  register = () => {
		dispatch({type:'CHANGEACTIVEKEY',data: "2"})
    }
    const login = () => {
		dispatch({type:'CHANGEACTIVEKEY',data: "1"})
    }
	return (
		<div className="header-container">
			<div className="header-container-left">
				<div>LOGO</div>
				<ul>
					<li>交流</li>
					<li>案例</li>
					<li>框架</li>
				</ul>
			</div>
			<div className="header-container-right">
				<ul>
					<li >
						<Link to="/login" onClick={login}>登录</Link>
					</li>
					<li >
                        <Link to='/register' onClick={register}> 注册</Link>
                    </li>
				</ul>
			</div>
          
		</div>
	);
};
export default connect(
	state =>state,
  )(Header)
