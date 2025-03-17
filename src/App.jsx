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
      <div id="Info">
        <h1>The Top 200 Best Selling Games</h1>
        <h3>as of 2015</h3>
        <Card>
          <p>
            This project is an analysis of the top 200 best selling video games
            by number of copies (in millions)
          </p>
          <p>
            You can Navigate this document by scrolling, insights into the
            charts will appear in cards like the one this message is in.
          </p>
          <p>
            {" "}
            Throughout the document{" "}
            <Highlight color={"steelblue"}>
              Categories and Criteria
            </Highlight>{" "}
            will be highlighted serving as a legend for some of the key data.
          </p>
        </Card>
      </div>
      <SalesByYear />
      <div className="section" id="SalesByConsole">
        <div className="background">
          <h1>Sales By Console</h1>
          <h3>Sales figures in millions for the various consoles</h3>
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
              First the obvious,{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              game sales Dominated the top 200 at over
              <em style={{ fontWeight: "bold" }}>371 million globally</em>, one
              thing to note however is that although it is a{" "}
              <Highlight color={"#FD8888"}>Japanese</Highlight> console,{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>
              games were not the most popular in{" "}
              <Highlight color={"#FD8888"}>Japan</Highlight>, that title belongs
              to{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                DS
              </Highlight>{" "}
              games, whose total{" "}
              <Highlight color={"#FD8888"}>Japanese</Highlight> sales almost{" "}
              <em style={{ fontWeight: "bold" }}>doubled</em> that of{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              games.
            </p>
          </Card>
          <Card>
            <p>
              An often-overlooked aspect of{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              games’ seeming commercial dominance however is that its top
              selling games were often games that were bundled with the{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              for example our number one game{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii Sports
              </Highlight>
              , so it is hard to say whether these games sales come from{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              sales or if the games were purchased on their own.
            </p>
          </Card>
          <Card>
            <p>
              Another by-product of this bundling is that the{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii
              </Highlight>{" "}
              is technically the{" "}
              <em style={{ fontWeight: "bold" }}>best-selling</em> console for
              sports games by a very healthy margin; almost{" "}
              <em style={{ fontWeight: "bold" }}>80%</em> of total{" "}
              <em style={{ fontWeight: "bold" }}>global</em> sports game sales,
              as well as having the most sports games of{" "}
              <em style={{ fontWeight: "bold" }}>all</em> platforms.
            </p>
          </Card>
          <Card>
            <p>
              Some other “best” platforms are the{" "}
              <Highlight color={"#003791"} textColor="#fff7f8">
                PS3
              </Highlight> for Action games, The
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                GameBoy for Adventure, Puzzle & Role Playing
              </Highlight>
              , the{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii for fighting
              </Highlight>{" "}
              ,{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                The NES for Platformers
              </Highlight>{" "}
              , the{" "}
              <Highlight color={"#003791"} textColor="#fff7f8">
                PS2
              </Highlight>{" "}
              narrowly beating the
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                <Highlight color={"#FF0000"} textColor="#fff7f8">
                  Wii
                </Highlight>
              </Highlight>{" "}
              for racing (Mario kart was the runner up), The{" "}
              <Highlight color={"#107C10"} textColor="#fff7f8">
                Xbox 360 for Shooters
              </Highlight>{" "}
              (Halo unsurprisingly), surprisingly the{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                DS
              </Highlight>{" "}
              beat out <Highlight color={"#E5E5E5"}>PC</Highlight> for{" "}
              <em style={{ fontWeight: "bold" }}>simulation</em>, and the{" "}
              <em style={{ fontWeight: "bold" }}>
                <Highlight color={"#FF0000"} textColor="#fff7f8">
                  N64
                </Highlight>{" "}
                for strategy
              </em>
              .
            </p>
          </Card>
        </div>
      </div>
      <div className="section" id="SalesByGenre">
        <div className="background">
        <h1>Sales By Genre</h1>
        <h3>Sales figures in millions for the various genres</h3>
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
              First the obvious: among the top 200 games the{" "}
              <em style={{ fontWeight: "bold" }}>bestseller</em> all over the
              world was Shooters, narrowly beating Platformers by a difference
              of roughly{" "}
              <em style={{ fontWeight: "bold" }}>only 660000 copies sold</em>.
            </p>
          </Card>
          <Card>
            <p>
              Now let’s examine each region,{" "}
              <Highlight color={"#67FF4C"}>North America</Highlight> seems to
              adore the shooter genre, accounting for{" "}
              <em style={{ fontWeight: "bold" }}>
                200 of its 338 million sold copies.
              </em>
              <Highlight color={"#6CB0FF"}>Europe</Highlight> on the other hand
              holds Action games very slightly above them at{" "}
              <em style={{ fontWeight: "bold" }}>99.62 million</em>.{" "}
              <Highlight color={"#FD8888"}>Japan's</Highlight> clear winner is
              the Role Playing or RPG Genre with{" "}
              <em style={{ fontWeight: "bold" }}>90.31 million</em> copies. And
              the <Highlight color={"#FFD455"}>Other</Highlight> unaccounted-for
              regions of the world favour Action games.
            </p>
          </Card>
          <Card>
            <p>
              The best selling game of all time (as of 2015){" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Wii Sports
              </Highlight>{" "}
              has
              <em style={{ fontWeight: "bold" }}> 82.74 million</em> global
              sales, <em style={{ fontWeight: "bold" }}>36 percent</em> of the
              sales of its
              <em style={{ fontWeight: "bold" }}>entire genre</em> and yet its
              genre only holds <em style={{ fontWeight: "bold" }}>5th place</em>{" "}
              in terms of overall sales.
            </p>
          </Card>
          <Card>
            <p>
              Platformers have the most games belonging to a single franchise,
              with a whopping <em style={{ fontWeight: "bold" }}>17</em> Super
              Mario Games. Second Place goes to the role-playing Genre with{" "}
              <em style={{ fontWeight: "bold" }}>13</em> Pokémon Games.
            </p>
          </Card>
          <Card>
            <p>
              Action games had the highest publisher variety, featuring{" "}
              <em style={{ fontWeight: "bold" }}>13 different</em> publishers.
              The lowest publisher variety is tied between Puzzle and Adventure,
              I didn’t count Strategy as it is less about them having a single
              publisher and more about them only having a single game.
            </p>
          </Card>
          <Card>
            <p>
              That’s another note, there is a{" "}
              <em style={{ fontWeight: "bold" }}>single</em> strategy game
              within the top 200 best selling games and it is a{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Nintendo
              </Highlight>{" "}
              game, Pokémon Stadium to be exact.
            </p>
          </Card>
        </div>
      </div>
      <div className="section" id="SalesByPub">
        <div className="background">
        <h1 style={{marginTop: `${0}px`}}>Sales By Publisher</h1>
        <h3>Sales figures in millions for the various publishers</h3>
          <SalesByPub />
        </div>
        <div>
          <Card>
            <p>
              Now we examine sales by Publisher, this one will be brief as the
              <em style={{ fontWeight: "bold" }}> chart</em> does most of the
              heavy lifting.
            </p>
            <p>
              This tree map gives you a{" "}
              <em style={{ fontWeight: "bold" }}>multi-layered</em> overview of
              the sales grouped at first, by their{" "}
              <em style={{ fontWeight: "bold" }}>publisher</em>.
            </p>
            <p>
              <em style={{ fontWeight: "bold" }}>Clicking</em> on an area will
              zoom in and show you the sales grouped by{" "}
              <em style={{ fontWeight: "bold" }}>Game</em> and coloured
              similarly to a heat map, clearing showing the difference in sales.
            </p>
            <p>
              <em style={{ fontWeight: "bold" }}>Clicking</em> once more on an
              area will zoom in and show you the games sales figures grouped by{" "}
              <em style={{ fontWeight: "bold" }}>Region</em>. To zoom out simply
              click on the top most bar of the chart.
            </p>
          </Card>
          <Card>
            <p>
              The top 200 bestselling video games (individual copies) as of 2015
              sold a staggering{" "}
              <em style={{ fontWeight: "bold" }}>2.058 BILLION</em> copies. In
              2015 this would be{" "}
              <em style={{ fontWeight: "bold" }}>
                27% of the human population
              </em>
              .
            </p>
          </Card>
          <Card>
            <p>
              <Highlight color={"#67FF4C"}>North American</Highlight> Sales
              clocked in at{" "}
              <em style={{ fontWeight: "bold" }}>978.2 million copies</em>,
              that’s nearly 3 games per person in{" "}
              <Highlight color={"#67FF4C"}>North America</Highlight> in 2015
              (362 million) accounting for{" "}
              <em style={{ fontWeight: "bold" }}>47.5% of the total</em>,
              beating their European counterpart by nearly{" "}
              <em style={{ fontWeight: "bold" }}>300 million</em> copies sold.
            </p>
          </Card>
          <Card>
            <p>
              Why is this important? Because of those 2.058 billion copies a
              staggering <em style={{ fontWeight: "bold" }}>1.083 billion</em>{" "}
              copies were published by{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Nintendo
              </Highlight>{" "}
              <em style={{ fontWeight: "bold" }}>alone </em>
              accounting for <em style={{ fontWeight: "bold" }}>52.6%</em> of
              all sales. Second place is held by Activision with only{" "}
              <em style={{ fontWeight: "bold" }}>207 million</em> copies sold.
            </p>
          </Card>
          <Card>
            <p>
              While there is a healthy variety of publishers, all of them are
              wholly overshadowed by the behemoths that are{" "}
              <Highlight color={"#FF0000"} textColor="#fff7f8">
                Nintendo
              </Highlight>
              's Catalogues and Sales figures. The sales on a{" "}
              <em style={{ fontWeight: "bold" }}>regional</em> level were all
              outdone by a <em style={{ fontWeight: "bold" }}>single studio</em>
              !
            </p>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
