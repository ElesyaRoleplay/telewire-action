require("dotenv").config;
const Bot = require("node-telegram-bot-api");
let {
  INPUT_STATUS: ipstatus,
  INPUT_TOKEN: tgtoken,
  INPUT_CHAT: chatid,
  INPUT_IU_TITLE: ititle,
  INPUT_IU_NUM: inum,
  INPUT_IU_ACTOR: iactor,
  INPUT_IU_BODY: ibody,
  INPUT_PR_NUM: pnum,
  INPUT_PR_STATE: prstate,
  INPUT_PR_TITLE: ptitle,
  INPUT_PR_BODY: pbody,
  GITHUB_EVENT_NAME: ghevent,
  GITHUB_REPOSITORY: repo,
  GITHUB_ACTOR: ghactor,
  GITHUB_SHA: sha,
  GITHUB_WORKFLOW: ghwrkflw,
} = process.env;

const bot = new Bot(tgtoken);

const evresp = (gevent) => {
  switch (prstate) {
    case "opened":
      prstate = "aperta";
      break;
    case "closed":
      prstate = "chiusa";
      break;
    case "deleted":
      prstate = "eliminata";
      break;
    case "transferred":
      prstate = "trasferita";
      break;
    case "pinned":
      prstate = "pinnata";
      break;
    case "unpinned":
      prstate = "unpinnata";
      break;
    case "reopened":
      prstate = "riaperta";
      break;
    case "assigned":
      prstate = "assegnata";
      break;
    case "unassigned":
      prstate = "disassegnata";
      break;
    case "locked":
      prstate = "bloccata";
      break;
    case "unlocked":
      prstate = "sbloccata";
      break;
    case "created":
      prstate = "creata";
      break;
    case "answered":
      prstate = "riisposta";
      break;
    case "edited":
      prstate = "modificata";
      break;
    case "requested":
      prstate = "richiesta";
      break;
    case "completed":
      prstate = "completata";
      break;
    case "moved":
      prstate = "spostata";
      break;
    case "converted":
      prstate = "convertita";
      break;
    case "synchronize":
      prstate = "sincronizzata";
      break;
    case "converted_to_draft":
      prstate = "convertita a bozza";
      break;
    case "enqueued":
      prstate = "messa in coda";
      break;
    case "dequeued":
      prstate = "tolta dalla coda";
      break;
    case "ready_for_review":
      prstate = "pronta alla review";
      break;
    case "review_requested":
      prstate = "richiesta review";
      break;
    case "dismissed":
      prstate = "deposta";
      break;
    case "published":
      prstate = "pubblicato";
      break;
    case "updated":
      prstate = "aggiornato";
      break;
    case "released":
      prstate = "rilasciato";
      break;
    case "prereleased":
      prstate = "rilasciato in preview";
      break;
    case "started":
      prstate = "startato";
      break;
    case "in_progress":
      prstate = "in progresso";
  }

  switch (gevent) {
    case "issues":
      return `
✉️ __Nuovi problemi in arrivo__
  __... e più precisamente su__ **${repo}**

Issue ${prstate}

🔤 | Titolo dell'issue: __${ititle}__
🧮 | Numero dell'issue: __[#${inum}](https://github.com/${repo}/issues/${inum})__
🗿 | Commentata o creata da: [${iactor}](https://github.com/${iactor})
🧥 | Corpo dell'issue: 
**${ibody}**

[📎📄 Link all'Issue](https://github.com/${repo}/issues/${inum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)`;
    case "issue_comment":
      return `
✉️ __Qualcuno ha commentato i problemi__
  __... e più precisamente su__ **${repo}**

🔤 | Titolo dell'issue: __${ititle}__
🧮 | Numero dell'issue: __[#${inum}](https://github.com/${repo}/issues/${inum})__
🗿 | Commentata o creata da: [${iactor}](https://github.com/${iactor})
🧥 | Corpo dell'issue: 
**${ibody}**
Issue Comment: 
**${process.env.INPUT_IU_COM}**

[📎📄 Link all'Issue](https://github.com/${repo}/issues/${inum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)
`;
case "push":
      return `
✉️ __Qualcuno ha messo qualcosa__
  __... e più precisamente su__ **${repo}**

Push

🔤 | Titolo dell'issue: __${ititle}__
🧮 | Numero dell'issue: __[#${inum}](https://github.com/${repo}/issues/${inum})__
🗿 | Commentata o creata da: [${iactor}](https://github.com/${iactor})
🧥 | Corpo dell'issue: 
**${ibody}**

[📎📄 Link all'Issue](https://github.com/${repo}/issues/${inum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)`;
    case "pull_request":
      return `
✉️ __Qualcuno ha migliorato qualcosa e ora vuole aggiungerla__
  __... e più precisamente su__ **${repo}**

PR ${prstate} 

🔤 | PR Title: ${ptitle}  
🧮 | PR Number: ${pnum}
🗿 | PR By: ${ghactor}
🧥 | PR Body:
**${pbody}**

[📎📄 Link alla PR](https://github.com/${repo}/pull/${pnum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)`;
    default:
      return `
⬆️⇅⬆️⇅
            
ID: ${ghwrkflw}
        
L'azione era un *${ipstatus}!*
Repository: ${repo}
Su: *${ghevent}*
Da: *${ghactor}* 
Tag: ${process.env.GITHUB_REF}
        
[Link to Repo ](https://github.com/${repo}/)`;
  }
};
const output = evresp(ghevent);
bot.sendMessage(chatid, output, {
  parse_mode: "Markdown",
  message_thread_id: 56,
});
