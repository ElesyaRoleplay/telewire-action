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
  INPUT_PS_HEAD_ID: psheadid,
  INPUT_PS_HEAD_AUTHOR_USERNAME: psauthoruser,
  INPUT_PS_HEAD_MESSAGE: psheadmess,
  INPUT_PS_COMPARE: pscompare,
  INPUT_PS_SENDER_IMAGE: psimage,
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
      prstate = "risposta";
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
✉️ _Nuovi problemi in arrivo_
  _... e più precisamente su_ *${repo}*

Issue ${prstate}

🔤 | Titolo dell'issue: _${ititle}_
🧮 | Numero dell'issue: _[#${inum}](https://github.com/${repo}/issues/${inum})_
🗿 | Commentata o creata da: [${iactor}](https://github.com/${iactor})
🧥 | Corpo dell'issue: 
*${ibody}*

[📎📄 Link all'Issue](https://github.com/${repo}/issues/${inum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)`;
    case "issue_comment":
      return `
✉️ _Qualcuno ha commentato i problemi_
  _... e più precisamente su_ *${repo}*

🔤 | Titolo dell'issue: _${ititle}_
🧮 | Numero dell'issue: _[#${inum}](https://github.com/${repo}/issues/${inum})_
🗿 | Commentata o creata da: [${iactor}](https://github.com/${iactor})
🧥 | Corpo dell'issue: 
*${ibody}*
Issue Comment: 
*${process.env.INPUT_IU_COM}*

[📎📄 Link all'Issue](https://github.com/${repo}/issues/${inum})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)
`;
    case "push":
      return `
✉️ _Qualcuno ha aggiunto qualcosa_
  _... e più precisamente su_ *${repo}*

🧮 | Numero dell'issue: _[#${psheadid}](https://github.com/${repo}/issues/${psheadid})_
🗿 | Commentata o creata da: [${psauthoruser}](https://github.com/${psauthoruser})
🧥 | Corpo dell'issue: 
*${psheadmess}*

[📎📄 Compare](${pscompare})
[📎🗂 Link alla Repo](https://github.com/${repo}/)
[📎🧾 Build log](https://github.com/${repo}/commit/${sha}/checks)
`;
    case "pull_request":
      return `
✉️ _Qualcuno ha migliorato qualcosa e ora vuole aggiungerla_
  _... e più precisamente su_ *${repo}*

PR ${prstate} 

🔤 | Titolo della PR: ${ptitle}  
🧮 | Numero della PR: ${pnum}
🗿 | Autore della PR: ${ghactor}
🧥 | Corpo della PR:
*${pbody}*

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
psimage.replace(".", "\\.");
bot.sendMessage(chatid, output, {
  parse_mode: "Markdownv2",
  message_thread_id: 56,
  link_preview_options: {
    is_disabled: false,
    url: psimage,
    prefer_small_media: true,
    prefer_big_media: false,
    show_above_text: false
  }
});
