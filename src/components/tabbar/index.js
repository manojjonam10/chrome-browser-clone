import React from "react";
import {ImSpinner3} from "react-icons/im";
import {GrFormClose} from "react-icons/gr";
import {AiOutlinePlus} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {chromeActions} from "../../store";
import './index.css'

const Tabbar = () => {
    const selectorState = useSelector(state => state.chromeData)
    const {tabs,currentTab,loading} = selectorState
    const dispatch = useDispatch()
    const {setTabList, setTabIndex} = chromeActions


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

    const addNewTab = () =>{
        let t = [...tabs]
        t.push({
            selectedIndex:0,
            url:[''],
        })
        dispatch(setTabIndex(tabs.length))
        dispatch(setTabList(t))

    }
    const closeTab = () => {
        let t = [...tabs]
        t.splice(currentTab,1)
        dispatch(setTabList(t))
    }

    return (
        <div className={'tab-bar'}>
            <div className={'red-btn'} />
            <div className={'yellow-btn'} />
            <div className={'green-btn'} />
            <div className={'tab-container'}>
                {
                    tabs.map((item,index) => {
                        return (
                            <div key={item.url+index} onClick={()=>dispatch(setTabIndex(index))} className={'tabs'}>
                                {
                                    loading && index === currentTab ?
                                        <ImSpinner3 className={'load-spinner'}  fontSize={20}/>:
                                        <img alt={'favicon'} className={'tab-favicon'}
                                             src={getFavicon(item.url[item.selectedIndex])}/>
                                }
                                <div className={'domain-name'}>{getDomainName(item.url[item.selectedIndex])}</div>
                                <GrFormClose onClick={closeTab} cursor={'pointer'} color={'red'} fontSize={18}/>
                            </div>
                        )
                    })
                }
                <AiOutlinePlus onClick={addNewTab} cursor={'pointer'} className={'new-tab-icon'}/>

            </div>

        </div>
    )
}

export default Tabbar;
