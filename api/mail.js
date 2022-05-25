const templateMail = (displayName, verifyLink) => {
    return `
        <html lang="fr">
        <div class="jsConTent">
            <meta>
            <style>

                div.zm_2829147963165950005_parse_-7426135182097824782 *#x_-473229894outlook a {
                    padding: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 {
                    width: 100%;
                    margin: 0;
                    padding: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 table td {
                    border-collapse: collapse
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 table {
                    table-layout: fixed
                }

                @media screen and (max-width: 635px) {
                    div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894main-wrap {
                        width: 100%
                    }
                }

                @media screen and (max-width: 480px) {
                    div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h1 {
                        margin-bottom: 5px
                    }

                    div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894main_wrapper {
                        padding: 0
                    }

                    div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894comment_body {
                        border-bottom: 1px solid rgb(221, 221, 221)
                    }
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td blockquote + * {
                    margin-top: 20px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td h1 {
                    padding: 20px 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td h2 {
                    padding: 0 0 5px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td p {
                    padding: 10px 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td hr + * {
                    padding-top: 30px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td ol, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td ul {
                    padding: 0 0 20px 40px;
                    margin: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td ol li, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td ul li {
                    padding: 3px 0;
                    margin: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td > *:first-child {
                    margin-top: 0;
                    padding-top: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894ExternalClass *.x_-473229894content-td > *:first-child {
                    margin-top: 0;
                    padding-top: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894admin_name b {
                    color: rgb(111, 111, 111)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894date_cell a {
                    color: rgb(153, 153, 153)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h1 {
                    font-size: 26px;
                    line-height: 33px;
                    color: rgb(40, 47, 51);
                    margin-bottom: 7px;
                    margin-top: 30px;
                    font-weight: bold
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h1 a {
                    color: rgb(40, 47, 51)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h2 {
                    font-size: 18px;
                    font-weight: bold;
                    color: rgb(40, 47, 51);
                    margin: 30px 0 7px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h2 a {
                    color: rgb(40, 47, 51)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h1 + h2 {
                    margin-top: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h2 + h1 {
                    margin-top: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h3, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h4, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h5 {
                    font-size: 16px;
                    font-weight: bold;
                    margin-bottom: 5px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td p {
                    font-size: 16px;
                    margin: 0 0 17px 0;
                    line-height: 1.5
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td p img, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h1 img, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td h2 img, div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td li img {
                    margin: 0;
                    padding: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td a[href] {
                    color: rgb(18, 81, 186)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td blockquote {
                    margin: 40px 0;
                    font-style: italic;
                    color: rgb(140, 140, 140);
                    font-size: 18px;
                    text-align: center;
                    padding: 0 30px;
                    font-family: Georgia, sans-serif
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td blockquote a {
                    color: rgb(140, 140, 140)
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td ul {
                    list-style: disc;
                    margin: 0 0 20px 40px;
                    padding: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td ol {
                    list-style: decimal;
                    margin: 0 0 20px 40px;
                    padding: 0
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td img {
                    margin: 10px 0;
                    max-width: 100%
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td hr {
                    border: none;
                    border-top: 1px solid rgb(221, 221, 221);
                    border-bottom: 0;
                    margin: 10px 20% 10px 20%
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894main_wrapper {
                    padding: 0 20px
                }

                div.zm_2829147963165950005_parse_-7426135182097824782 *.x_-473229894content-td > *:first-child {
                    margin-top: 0;
                    padding-top: 0
                }
            </style>
            <div class=" zm_2829147963165950005_parse_-7426135182097824782"><span
                    style="font-size: 1.0px;display: none;color: rgb(255,255,255);">MecaVIN -</span>
                <table cellpadding="0" cellspacing="0" border="0" align="center"
                       style="background: rgb(249,249,249);border-collapse: collapse;line-height: 100.0%;margin: 0;padding: 0;width: 100.0%;"
                       bgcolor="#f9f9f9">
                    <tbody>
                    <tr>
                        <td>
                            <table class="x_-473229894main-wrap"
                                   style="border-collapse: collapse;margin: auto;max-width: 635px;min-width: 320px;width: 100.0%;">
                                <tbody>
                                <tr>
                                    <td valign="top">
                                        <table cellpadding="0" cellspacing="0" border="0"
                                               style="border-collapse: collapse;color: rgb(192,192,192);font-family: &quot;Helvetica Neue&quot;, Arial, sans-serif;font-size: 13px;line-height: 26px;margin: 0 auto 26px;width: 100.0%;"></table>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="x_-473229894main_wrapper" valign="top" style="padding: 0 20px;">
                                        <table cellpadding="0" cellspacing="0" border="0" align="center"
                                               style="border-collapse: collapse;border-radius: 3px;color: rgb(0,6,70);font-family: &quot;Helvetica Neue&quot;, Arial, sans-serif;font-size: 13px;line-height: 20px;margin: 0 auto;width: 100.0%;">
                                            <tbody>
                                            <tr>
                                                <td valign="top">
                                                    <table class="x_-473229894comment_body" cellpadding="0"
                                                           cellspacing="0"
                                                           border="0" bgcolor="white"
                                                           style="border-collapse: collapse;border-radius: 4.0px;width: 100.0%;">
                                                        <tbody>
                                                        <tr>
                                                            <td class="x_-473229894content-td" valign="top" align="left"
                                                                style="padding: 24px;">

                                                                <img
                                                                        style="height: 150px; width: 150px;  margin-left: 150px;"
                                                                        align="center"
                                                                        alt="icon"
                                                                        src="https://raw.githubusercontent.com/Alexandre-Vernet/File-Sync/main/front/src/assets/icons/app_icon/icon.png">

                                                                <h1 align="center"
                                                                    style="font-size: 24px;line-height: 33px;margin-bottom: 27px;margin-top: 17px;text-align: left;"
                                                                    id="x_-473229894header">
                                                                    Verify your email</h1>
                                                                <p style="line-height: 1.5;margin: 0 0 17px;text-align: left;"
                                                                   align="left">Hi ${ displayName }</p>
                                                                <p style="line-height: 1.5;margin: 0 0 17px;text-align: left;"
                                                                   align="left" id="x_-473229894company1">
                                                                    Please click on the link below to verify your email
                                                                    address.
                                                                </p>
                                                                <div class="x_-473229894content_wrapper"
                                                                     style="line-height: 1.5;margin: 32.0px 0;">
                                                                    <a
                                                                            href="${ verifyLink }"
                                                                            id="x_-473229894emailCta" target="_blank"
                                                                            style="background-color: #23b0ff; border-radius: 19px;
                                                                    color: rgb(255,255,255);font-size: 14px;
                                                                    font-weight: 600;padding: 10px 20px;
                                                                    margin-left: 150px;
                                                                    text-decoration: none;">Verify mail</a>
                                                                </div>
                                                                <br>
                                                                This is an automated email, please do not reply.
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                    <br>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td valign="top" height="20"></td>
                                </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </html>
    `;
}

module.exports = templateMail;
