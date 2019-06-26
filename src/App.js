import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score";
import lol from "./cards.json";
import "./App.css";

class App extends Component {
    //setting this.state.lol to the cards json array
    state = {
        lol,
        clickedDollIds: [],
        score: 0,
        highscore: 0,
        goal: 12,
        status: ""
    };

//shuffle the lol cards in the browser when clicked
shuffleScoreCard = id => {
    let clickedDollIds = this.state.clickedDollIds;

    if(clickedDollIds.includes(id)){
        this.setState({ clickedDollIds: [], score: 0, highscore: this.state.score, status: "Game Over! You lost. Click to try again!" });
        console.log(this.state.highscore);
        return;
    }else{
        clickedDollIds.push(id)

        if(clickedDollIds.length === 12){
            this.setState({score: 12, status: "Surprise! You Won! Great Job. Click to play again!", clickedDollIds: []});
            console.log("You Win");
            return;        
        }

        this.setState({ lol, clickedDollIds, score: clickedDollIds.length, stauts: " " });

        for (let i = lol.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [lol[i], lol[j]] = [lol[j], lol[i]];
        }
    }
}

// Map over this.state.cards and render a Card compnent for each card object
render() {
    return (
        <div className="App">
            <header className="App-header" >
                <h1 className="App-title">LOL Surprise! Clicky Game</h1>
                    <p className="App-intro">Try not to click the same image twice!</p>
            </header>
            <Score total={this.state.score} highscore={this.state.highscore}
            goal={12}
            status={this.state.status}
            />
            <Wrapper>
              
                  {this.state.lol.map(doll => (
                      <Card
                      shuffleScoreCard={this.shuffleScoreCard}
                      id={doll.id}
                      key={doll.id}
                      image={doll.image}
                      />
                  ))}
      
            </Wrapper>
            {/* <footer className="App-footer">
                

            </footer> */}
        </div>

    )
}

}
 export default App;