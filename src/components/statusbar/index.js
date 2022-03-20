import React, {useEffect, useState} from "react";
import {HiOutlineArrowLeft, HiOutlineArrowRight} from "react-icons/hi";
import {IoIosInformationCircleOutline, IoMdRefresh} from "react-icons/io";
import './index.css'
import {useSelector,useDispatch} from "react-redux";
import {chromeActions} from "../../store";

const Statusbar = (props) => {
    const dispatch = useDispatch()
    const selectorState = useSelector(state => state.chromeData)
    const {tabs,currentTab} = selectorState
    const {setTabList,setLoading,setURLList} = chromeActions

    useEffect(() => {
        if (tabs[currentTab]) {
            if (tabs[currentTab].selectedIndex === 0) {
                document.getElementById('statusInput').value = ''
            } else {
                const url = tabs[currentTab].url
                const index = tabs[currentTab].selectedIndex
                document.getElementById('statusInput').value = url[index]
            }
        }},[currentTab, tabs])


    const statusURL = (e) => {
        if (e.keyCode === 13 &&
            !tabs[currentTab].url[tabs[currentTab].selectedIndex].includes(e.currentTarget.value)){
            let d = [...tabs]
            let dx = {...d[currentTab]}
            let bbx = [...dx.url]
            bbx.push('https://'+e.currentTarget.value)
            dx.url = bbx
            dx.selectedIndex = bbx.length-1
            d[currentTab] = dx
            dispatch(setURLList('https://'+e.currentTarget.value))
            dispatch(setTabList(d))
            dispatch(setLoading(true))
        }
    }

    const onBack = () => {
        if (tabs[currentTab].selectedIndex > 0){
            let d = [...tabs]
            let dx = {...d[currentTab]}
            dx.selectedIndex = dx.selectedIndex-1
            d[currentTab] = dx
            dispatch(setTabList(d))
        }
    }

    const onForward = () => {
        if (tabs[currentTab].selectedIndex < tabs[currentTab].url.length-1){
            let d = [...tabs]
            let dx = {...d[currentTab]}
            dx.selectedIndex = dx.selectedIndex+1
            d[currentTab] = dx
            dispatch(setTabList(d))
        }
    }

    const checkForward = () =>{
        if (tabs[currentTab]){
            return tabs[currentTab].selectedIndex < tabs[currentTab].url.length-1
        }
        return false
    }

    return (
        <div className={'statusbar'}>
            <HiOutlineArrowLeft fontSize={18} onClick={onBack}
                                opacity={tabs[currentTab] ? tabs[currentTab].selectedIndex > 0 ?1:0.2:0.2}  />
            <HiOutlineArrowRight onClick={onForward}
                style={{marginLeft:'1vw'}} fontSize={18} opacity={checkForward() ? 1:0.2} />
            <IoMdRefresh onClick={props.refresh}
                fontSize={20} style={{marginLeft:'0.8vw'}} opacity={0.5} />
            <div className={'statusbar-input-div'}>
                <IoIosInformationCircleOutline fontSize={17}/>
                <input id={'statusInput'}
                    onKeyDown={statusURL}  className={'statusbar-input'}/>

            </div>
        </div>
    )
}

export default Statusbar;
