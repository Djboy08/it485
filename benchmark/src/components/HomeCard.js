
function HomeCard(props) {
  let s = "bd-placeholder-img "
  if (props.circle){
    s = s + "rounded-circle"
  }

  return (
    <>
      <div className="col-lg-4 py-5" style={{color: "white"}}>
        <svg
          className= {s}
          width="140"
          height="140"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Placeholder: 140x140"
          focusable="false"
        >
            <image style = {{width: "140", height: "140px"}}href={props.src}></image>
            
        </svg>
        <h4>{props.title}</h4>
        <p>
          {props.description}
        </p>
        <p>
        </p>
      </div>
    </>
  );
}

export default HomeCard;
