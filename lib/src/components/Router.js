import{jsx as _jsx,Fragment as _Fragment}from"react/jsx-runtime";import{useState,useEffect,Children}from"react";import{NAVIGATION_EVENTS}from"../constants/constants.js";import{getCurrentPath}from"../utils/getCurrentPath.js";import{match}from"path-to-regexp";export function Router({children,routes=[],defaultComponent:DefaultComponent=()=>null}){const[currentPath,setPath]=useState(getCurrentPath());const routeParams={};const childrenRoutes=Children.map(children,({props,type})=>{const{name}=type;if(name!=="Route")return null;return props})||[];const routesToUse=[...routes,...childrenRoutes];const Component=routesToUse.find(({path})=>{if(path===currentPath)return true;const matchPath=match(path,{decode:decodeURIComponent});if(matchPath(currentPath)){routeParams.params=matchPath(currentPath).params;return true}return false})?.Component;useEffect(()=>{const handlePathChange=()=>{setPath(getCurrentPath())};window.addEventListener(NAVIGATION_EVENTS.PUSH_STATE,handlePathChange);window.addEventListener(NAVIGATION_EVENTS.POP_STATE,handlePathChange);return()=>{window.removeEventListener(NAVIGATION_EVENTS.PUSH_STATE,handlePathChange);window.removeEventListener(NAVIGATION_EVENTS.POP_STATE,handlePathChange)}},[]);return _jsx(_Fragment,{children:Component?_jsx(Component,{routeParams:routeParams}):_jsx(DefaultComponent,{routeParams:routeParams})})}