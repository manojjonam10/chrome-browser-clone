import React from "react";
import Google from '../../assets/images/google.jpeg';
import './index.css'
import {AiOutlineSearch} from 'react-icons/ai';
import {IoIosMic} from 'react-icons/io'
import {useSelector} from "react-redux";

const DefaultPage = () => {
    const selectorState = useSelector(state => state.chromeData)

    const getDomainName = (url) => {
        if (url.length > 0){
            let domain = (new URL(url));
            domain = domain.hostname.replace('www.','');
            return domain
        }
        return 'New Tab'

    }

    const getFavicon = (url)=>{
        if (url.length > 0){
            return 'http://www.google.com/s2/favicons?domain='+url
        }
        return 'http://www.google.com/s2/favicons?domain=www.google.com'
    }

    return(
        <div style={{display:'flex',flexDirection:'column',backgroundColor:'white',
        alignItems:'center', paddingTop:'15vh'}}>
            <img style={{width:'18.2rem',height:'auto'}} src={Google} alt={'google'}/>
            <div className={'input-div'}>
                <AiOutlineSearch fontSize={20} style={{marginLeft:'0.8vw'}} opacity={0.5} />

                <input placeholder={'Search Google or type a URL'} className={'input-search'} />
                <IoIosMic fontSize={20}  opacity={0.5} />

            </div>
            <div className={'view-container'}>
                {
                   selectorState.URLList.map((item,index) => {
                       return (
                           <div className={'visited-container'}>
                           <div className={'visited-page'}>
                               <img alt={'favicon'} className={'favicon'}
                                    src={getFavicon(item)}/>
                           </div>
                               <div className={'visited-text'}>{getDomainName(item)}</div>
                           </div>

                       )

                   })
                }

            </div>
        </div>
    )
}

export default DefaultPage;
