import React, {useEffect, useState} from "react";
import './index.css';
import DefaultPage from "../components/defaultPage";
import Statusbar from "../components/statusbar";
import Tabbar from "../components/tabbar";
import {useSelector,useDispatch} from "react-redux";
import {chromeActions} from "../store/index";

const Browser = () => {
    const selectorState = useSelector(state => state.chromeData)
    const {tabs,currentTab} = selectorState
    const dispatch = useDispatch()
    const {setLoading} = chromeActions
    const currentURL = tabs[currentTab] ? tabs[currentTab].url[tabs[currentTab].selectedIndex]:''




    const onRefresh = () => {
        let iframe = document.getElementById('chromeIframe')
        iframe.src = iframe.src
    }

    return(
        <div className={'container'}>

         <Tabbar/>

           <Statusbar refresh={onRefresh}/>
            {
                currentURL.length === 0 ?
                    <DefaultPage/> :

                    <div style={{width:'100%',height:'100%'}}>

                        <iframe  onLoad={()=>dispatch(setLoading(false))}

                            id={'chromeIframe'}  style={{width:'100%',height:'100%'}} src={currentURL}/>

                    </div>

            }



        </div>
    )
}

export default Browser;
