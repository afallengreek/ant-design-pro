//列表公共样式配置
const LoginNormalCommonProps = {
    span:24,
    formlayout:{
      labelCol: {span: 0},
      wrapperCol: {span: 24}
    }
};
const  mapCommonProps ={
  LoginNormalCommonProps:LoginNormalCommonProps,
};
export function getWrapFormFunc({type,form,formlayout}) {
    //检查form和commonProps是否存在
    if(!form){
      throw "no form available!";
    }
    if(!mapCommonProps[type]){
      throw "no such commonProps available!"
    }
    let commonProps = mapCommonProps[type];
    commonProps.form = form;
    if(formlayout){
      commonProps.formlayout = formlayout;
    }
    return  commonProps;
}
