import data from "../../package.json" assert { type: "json" };

export default function Header() {
  const html = /* html */ `
    <header style="margin-top: 15px;">
        <nav>
            <ul>
                <li><a href="/"><button style="border:none; margin-top: 15px;font-size: large;">${
                  data.siteData.sitename
                }</button></a></li>
                <li class="float-right sticky">
                <select id="theme" onchange="tc()" style="font-size: small;width:fit-content;margin-top: 18px;">
                    <option value=" ">Default</option>
                    <option value="dark">Dark</option>
                    <option value="sepia">Sepia</option>
                    <option value="milligram">Milligram</option>
                    <option value="pure">Pure</option>
                    <option value="sakura">Sakura</option>
                    <option value="skeleton">Skeleton</option>
                    <option value="bootstrap">Bootstrap</option>
                    <option value="medium">Medium</option>
                    <option value="tufte">Tufte</option>
               </select>
               </li>
                    ${data.siteData.navLinks
                      .map((link) => {
                        return `<li class="float-right"><a href=${link.link}><button style="border:none; margin-top: 15px;">${link.name}</button></a></li>`;
                      })
                      .join(" \n")}
                <li class="float-right"><a href="/posts"><button style="border:none; margin-top: 15px;">Blog</button></a></li>
            </ul>
        </nav>
    </header>
    `;
  return html;
}
