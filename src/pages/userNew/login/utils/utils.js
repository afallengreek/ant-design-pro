import { parse } from 'qs';
import React, { Component } from 'react';
import {Alert} from 'antd';
export function getRenderMessage({content,type = "error"}){
  return <Alert
            style={{
              marginBottom: 24,
            }}
            message={content}
            type={type}
            showIcon
          />
}
export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}
export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority)); // hard code
  // reload Authorized component

  try {
    if (window.reloadAuthorized) {
      window.reloadAuthorized();
    }
  } catch (error) {
    // do not need do anything
  }

  return authority;
}
