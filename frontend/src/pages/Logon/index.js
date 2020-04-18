import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './style.css';
import { FaSignInAlt } from 'react-icons/fa';
import img_heroes from '../../assets/heroes.png';
import img_logo from '../../assets/logo.svg';

function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const res = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', res.data.name);
            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
    	<div className="logon-container">
    		<section className="form">
    			<img src={img_logo} alt="Be the Hero" />
    			
    			<form onSubmit={handleLogin}>
    				<h1>Faça seu logon</h1>
    				<input type="text" placeholder="Seu ID" value={id} onChange={e => setId(e.target.value)} />
    				<button className="button" type="submit">Entrar</button>
    				<Link to="/register" className="back-link">
    					<FaSignInAlt size={18} color="#e02041" />
    					Não tenho cadastro
    				</Link>
    			</form>
    		</section>
    		<img src={img_heroes} alt="Heroes" />
            <p style={{position:"absolute", bottom:"1.5%", right:"8%", fontSize:"16px", fontWeight:300}}>by Matheus Ramalho de Oliveira</p>
    	</div>
    );
}

export default Logon;