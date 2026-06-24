import { useEffect, useState } from 'react';
import './index.css';
import { allColors } from './colordata';

 
function App(){
    const [chances,setChance] = useState(0);
    const [loseflag,setLoseflag] = useState(false);
    const [winflag,setWinflag] = useState(false);
    const [arr,setArr] = useState(["red","red","red","red","red"]);
    const [randint,setRandint] = useState(Math.floor(Math.random() * allColors.length));
    const [boxflag,setBoxflag] = useState(false);
    const [restart,setRestart] = useState(false);
    const[checkedarray,setCheckedarray]= useState(["","","","",""]);
    const [selectedcolor, setSelectedcolor] = useState("");
   
    function checkClick(event){
        if(allColors[randint].name === selectedcolor){
            setBoxflag(true);
            setTimeout(() => {setLoseflag(true);},2000)
            return;
            
        }
        for(const checkedcolor of checkedarray){
            if(checkedcolor === selectedcolor){
                return;
            }
        }
        setCheckedarray((prevarray)=>{
            return (prevarray.map((element,index)=>{
            if(chances === index){
                return selectedcolor;
            }
            return element;
        }));
        })
        const nextchance = chances + 1;
        setChance(nextchance);
        setArr((arr)=>{
            return (arr.map((color,index)=> {
                if(index < nextchance){
                    return "green";
                } else {return "red";}
        }));
        })
        if(nextchance>4){
            setBoxflag(true);
            setTimeout(() => {setWinflag(true);},2000)
            return;
        }
    }
    
    function HandleRestart(event){
        setBoxflag(false);
        setLoseflag(false);
        setChance(0);
        setRandint(Math.floor(Math.random() * allColors.length));
        setWinflag(false);
        setArr(["red", "red", "red", "red", "red"]);  
        setCheckedarray(["","","","",""]);
        setSelectedcolor("");
    }

    function HandleCheckBox(event){
        setSelectedcolor(() => allColors[parseInt(event.target.id)].name);
    }

    return(<>
    <div className = "full">
        <h1 id='title'>Don't Guess Me</h1>
        <p id='gamerule'>Using the hint for a secret color, you must completely avoid guessing it for 5 rounds to win. One wrong guess means game over!</p>
        <div className = {`box ${boxflag? "finished":"playing"}`} style={{backgroundColor: boxflag? allColors[randint].hex:""}}>
            {boxflag? <h3>{allColors[randint].name.toUpperCase()}</h3>: <p> Hint: {allColors[randint].description}</p>}
        </div>
        <br></br>
        <div className = "divchances">
            {
                arr.map((_, index) => {
                    const isCorrect = index < chances;
                    return( <div className={`chances ${isCorrect? "turnGreen": "turnRed"}`} key={index} ></div>)
                })
            }
        </div>
        {loseflag && (
            <dialog open>
                <h3>You Lose</h3>
                <p>Better luck next time</p>
                <button id="restartBtn" onClick={HandleRestart}>Restart</button>
            </dialog>
        )}
        {winflag && (
            <dialog open>
                <h3>Congragulations!</h3>
                <p>You won</p>
                <button id="restartBtn" onClick={HandleRestart}>Restart</button>
            </dialog>
        )}
        <br></br>
        <button className='check' onClick={checkClick}> Check </button>
        <br></br>
        <div className="color-box-container" id="colorContainer">
            {allColors.map((color,index)=>{
                return (<div key ={index} className='color-item' > 
                    <input type="radio" id={index} className="color-checkbox" name="gameColorGroup" onChange={HandleCheckBox}></input>
                    <label htmlFor={index} className="checkmark-label">
                        <span className={`color-square ${color.isLight ? 'light-color' : ''}`} style={{backgroundColor: color.hex}}></span>
                        <span className="color-name">{color.name}</span>
                    </label>
                </div>);
            })}
        </div>
    </div>
    
    </>
    )
}
export default App;