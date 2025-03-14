import { extent, scaleLinear } from "d3";
import XAxis from "./components/axes/XAxis";
import "./App.css";
import YAxis from "./components/axes/YAxis";
import SalesByYear from "./components/charts/SalesByYear";
import SalesByPub from "./components/charts/SalesByPub";
import SalesByConsole from "./components/charts/SalesByConsole";
import SalesByGenre from "./components/charts/SalesByGenre";
import { useElementOnScreen } from "./components/Hooks";
import Card from "./components/Cards";
import Highlight from "./components/Highlight";

function App() {
  return (
    <>
      <div id="Info"></div>
      <div className="section" id="SalesByYear">
        <div className="background">
          <SalesByYear />
        </div>
        <div>
          <Card>
            <p>
              First well be looking at the Sales By Year for the Four Regions,
              <Highlight color={"#67FF4C"}>North America</Highlight>, <Highlight color={"#6CB0FF"}>Europe</Highlight>, <Highlight color={"#FD8888"} >Japan</Highlight>, and <Highlight color={"#FFD455"}>Other</Highlight>.
            </p>
          </Card>
          <Card>
            <p>
              <em style={{fontWeight: "bold",}}>2009</em> had the most successful game releases of the top 200 with
              <em style={{fontWeight: "bold",}}> 180.85 million</em> copies sold between just <em style={{fontWeight: "bold",}}>14 games</em>. <Highlight color={"#FF0000"} textColor="#fff7f8">Nintendo</Highlight>
               continues to dominate having published 5 of the 14 games.
            </p>
          </Card>
          <Card>
            <p>
              Game sales throughout the years are often evenly distributed,
              however there are some stand outs, games like <Highlight color={"#FF9D00"} >
                  Grand Theft Auto:
                  San Andreas
              </Highlight>, <Highlight color={"#FF0000"} textColor="#fff7f8">Mario kart Wii</Highlight>, <Highlight color={"#2DA2FC"} textColor="#fff7f8">Call of Duty Modern Warfare 3</Highlight> and
              especially <Highlight color={"#FF9D00"} >Grand Theft Auto 5</Highlight> all dominated their respective
              release years.
            </p>
          </Card>
          <Card>
            <p>
              If it was not evident before, <Highlight color={"#67FF4C"}>North American</Highlight> game sales tended to
              dominate the market, even on a year-by-year basis, although there
              were some instances where the race was close such as <em style={{fontWeight: "bold",}}>1994, 1995,
              2000, and 2014</em>. The largest competitor was the <Highlight color={"#6CB0FF"}>European</Highlight> market,
              outselling their <Highlight color={"#67FF4C"}>North American</Highlight> counterpart in 2005.
            </p>
          </Card>
        </div>
      </div>
      <div className="section" id="SalesByConsole">
        <div className="background">
          <SalesByConsole />
        </div>
        <div>
          <Card>
            <p>
              Next lets look at our assortment of consoles and their respective
              sales
            </p>
          </Card>
          <Card>
            <p>
              First the obvious, <em style={{fontWeight: "bold",}}>Wii</em> game sales Dominated the top 200 at over
              <em style={{fontWeight: "bold",}}>371 million globally</em>, one thing to note however is that although
              it is a <Highlight color={"#FD8888"}>Japanese</Highlight> console, Wii games were not the most popular in <Highlight color={"#FD8888"}>Japan</Highlight>, 
              that title belongs to DS games, whose total <Highlight color={"#FD8888"}>Japanese</Highlight> sales
              almost <em style={{fontWeight: "bold",}}>doubled</em> that of Wii games.
            </p>
          </Card>
          <Card>
            <p>
              An often-overlooked aspect of Wii games’ seeming commercial
              dominance however is that its top selling games were often games
              that were bundled with the Wii for example our number one game <Highlight color={"#FF0000"} textColor="#fff7f8">Wii
              Sports</Highlight>, so it is hard to say whether these games sales come from
              Wii sales or if the games were purchased on their own.
            </p>
          </Card>
          <Card>
            <p>
              Another by-product of this bundling is that the Wii is technically
              the <em style={{fontWeight: "bold",}}>best-selling</em> console for sports games by a very healthy
              margin; almost <em style={{fontWeight: "bold",}}>80%</em> of total <em style={{fontWeight: "bold",}}>global</em> sports game sales, as well as
              having the most sports games of all platforms.
            </p>
          </Card>
          <Card>
            <p>
              Some other “best” platforms are the PS3 for Action games, The
              GameBoy for Adventure, the Wii for fighting, The NES for
              Platformers, The GameBoy for Puzzle, the PS2 narrowly beating the
              Wii for racing (Mario kart was the runner up), The GameBoy for
              role Playing, The Xbox 360 for Shooters (Halo unsurprisingly),
              surprisingly the DS for simulation, and the N64 for strategy.
            </p>
          </Card>
        </div>
      </div>
      <div className="section" id="SalesByGenre">
        <div className="background">
          <SalesByGenre />
        </div>
        <div>
          <Card>
            <p>
              Lets take a look at the Genres. The individual Genres paint a much
              more personal picture for each region.
            </p>
          </Card>
          <Card>
            <p>
              First the obvious: among the top 200 games the most all over the
              world was Shooters, narrowly beating platformers (338.88 :
              338.22).
            </p>
          </Card>
          <Card>
            <p>
              Now let’s examine each region, North America seems to adore the
              shooter genre, accounting for 200 of its 338 million sold copies.
              Europe on the other hand holds Action games very slightly above
              them at 99.62 million. Japan’s clear winner is the Role Playing or
              RPG Genre with 90.31 million copies. And the other unaccounted-for
              regions of the world favour Action games.
            </p>
          </Card>
          <Card>
            <p>
              The best selling game of all time (as of 2015) Wii Sports has
              82.74 million global sales, 36 percent of the sales of its entire
              genre and yet its genre is holds 5th place in terms of sales.
            </p>
          </Card>
          <Card>
            <p>
              Platformers have the most games belonging to a single franchise,
              with a whopping 17 Super Mario Games. Second Place goes to the
              role-playing Genre with 13 Pokémon Games.
            </p>
          </Card>
          <Card>
            <p>
              Action games had the highest publisher variety, featuring 13
              different publishers. The lowest publisher variety is tied between
              Puzzle and Adventure, I didn’t count Strategy as it is less about
              them having a single publisher and more about them only having a
              single game.
            </p>
          </Card>
          <Card>
            <p>
              That’s another note, there is only a single strategy game within
              the top 200 best selling games and it is a Nintendo game, Pokémon
              Stadium to be exact.
            </p>
          </Card>
        </div>
      </div>
      <div className="section" id="SalesByPub">
        <div className="background">
          <SalesByPub />
        </div>
        <div>
          <Card>
            <p>
              Now we examine sales by Publisher, this one will be brief as the
              chart does most of the heavy lifting.
            </p>
          </Card>
          <Card>
            <p>
              The top 200 bestselling video games (individual copies) as of 2015
              sold a staggering 2.058 BILLION copies. In 2015 this would be 27%
              of the human population.
            </p>
          </Card>
          <Card>
            <p>
              North American Sales clocked in at 978.2 million copies, that’s
              nearly 3 games per person in North America in 2015 (362 million)
              accounting for 47.5% of the total, beating their European
              counterpart by nearly 300 million copies sold.
            </p>
          </Card>
          <Card>
            <p>
              Why is this important? Because of those 2.058 billion copies a
              staggering 1.083 billion copies were published by Nintendo
              accounting for 52.6% of all sales. Second place is held by
              Activision with only 207 million copies sold.
            </p>
          </Card>
          <Card>
            <p>
              While there is a healthy variety of publishers, all of them are
              wholly overshadowed by the behemoth that are Nintendo's Catalogues
              and Sales figures. The sales on a regional level were all outdone by a single
              studio!
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
