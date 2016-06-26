import React from 'react'

const DataDeepDive = () => (
  <div className="hunger-page-root">
    <h1 className="section-heading">Data Deep Dive</h1>
    <h2 className="subheading">The Model</h2>
    <p>Our model of hunger, food sufficiency, and housing sufficiency makes some simplifications and assumptions, in order to focus on a few key issues. Much of it is based on the Self-Sufficiency Standard, used in Hack Oregon's Raise Effect project, which you can read about <a href="http://raiseeffect.org/#/about?_k=33mbvy" target="_blank">here</a>. More details about the model are given below.</p>
    <h3 className="subheading">Food Sufficiency and Benefits</h3>
    <p>The model includes both SNAP (Supplemental Nutrition Assistance Program) benefits and school meal benefits. A large number of factors goes into calculating SNAP benefits, and Oregon Hunger Equation uses a slightly simplified version of the true SNAP benefit formula.<br></br>
    The model assumes that all children are given breakfast and lunch in school, and that if additional programming exists in their county to provide a third meal, that they have access to that third meal.</p>
    <h3 className="subheading">Housing Sufficiency</h3>
    <p>The model assumes that available income (not including food benefits) goes toward paying for housing first. We use the median cost of housing for each county, and define "housing sufficient" as spending 2/3 of available income or less on housing.</p>
    <h3 className="subheading">Other Costs</h3>
    <p>Once the cost of housing is covered, then the model splits additional income between transportation costs and miscellaneous costs. <em>Transportation costs</em> include car insurance, gas, oil, registration, repairs and monthly payments OR public transportation for commuting to and from work and day care plus a weekly shopping trip. <em>Miscellaneous costs</em> include clothing, shoes, paper products, diapers, nonprescription medications, cleaning products, household items, personal items and telephone service. The full Self-Sufficiency Standard takes other costs into account, but for simplicity, Oregon Hunger Equation includes only these two categories.</p>
    <br></br>
    <p>Here is a partial list of data sources and background information used in the project:</p>
    <ul className="deep-dive-source-list">
      <li><a href="http://raiseeffect.org/#/about?_k=33mbvy" target="_blank">http://raiseeffect.org/#/about?_k=33mbvy</a></li>
      <li><a href="http://agsci.oregonstate.edu/sites/agscid7/files/oregonhungerreportjune2016.pdf">http://agsci.oregonstate.edu/sites/agscid7/files/oregonhungerreportjune2016.pdf</a></li>
      <li><a href="https://oregonhunger.org/hunger-in-oregon" target="_blank">https://oregonhunger.org/hunger-in-oregon</a></li>
      <li><a href="http://map.feedingamerica.org/county/2014/overall/oregon" target="_blank">http://map.feedingamerica.org/county/2014/overall/oregon</a></li>
    </ul>


  </div>
)

export default DataDeepDive
