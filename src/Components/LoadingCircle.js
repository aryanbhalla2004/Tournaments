import "./Dashboard/style/dashboard.css";

const LoadingCircle = (props) => {
  return (
    <div className="center-loading-animation">
      <div class="lds-ring" style={{height: props.height}}><div style={{width: `${props.size}px`, height: `${props.size}px`, border: props.border, borderColor: props.color}}></div><div style={{width: `${props.size}px`, height: `${props.size}px`, border: props.border, borderColor: props.color}}></div><div style={{width: `${props.size}px`, height: `${props.size}px`, border: props.border, borderColor: props.color}}></div><div style={{width: `${props.size}px`, height: `${props.size}px`, border: props.border, borderColor: props.color}}></div></div>
    </div>
  )
}

export default LoadingCircle;