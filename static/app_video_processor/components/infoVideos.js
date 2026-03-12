export function paint_infoVideo(data){
    let script_color = ``;
    document.getElementById('table_videos').innerHTML = '';
    document.getElementById("insert_code").innerHTML = '';
    let total = 0;
    for (var i = 0; i < data.length; i++) {
        total++;
        const video_name = data[i].video_name;
        const old_name = data[i].old_name;
        const extension = data[i].extension;
        const file_name = data[i].file_name;
        const code = data[i].code;
        const acronym = data[i].acronym;
        const images_num = data[i].images_num;
        const fecha = data[i].fecha;
        const position = data[i].position;

        const comas = i == data.length - 1 ? '' : ',';

        let script = `{"name": "${video_name}", "extension": "${extension}", "acronimo": "${acronym}", "code": "${code}", "files_name": "${file_name}", "fecha": "${fecha}", "position": "${position}", "images_num": ${images_num}, "GO": 6}${comas}`;
        
        const html_table = `
        <tr class="ligth">
            <th class="organism_th_1 tittle_cont">
                <div class="icon">
                    <img width="26px" height="23" src="/static/img/icon_vid.png" alt="">
                </div>
                <div class="tittle">
                    <p class="thetitle">${file_name}-i${images_num}${extension}</p>
                    <span>
                        <p><strong style="color: #EF4E69;">Before: </strong> ${old_name}</p>
                    </span>
                </div>
            </th>
            <th class="organism_th_2"><p>${images_num}</p></th>
            <th class="organism_th_3">
                <div class="actions">
                    <img onclick="deleted_video(${acronym})" height="16px" src="/static/img/icon_deleted.png" alt="">
                </div>
            </th>
        </tr>
        `;

        document.getElementById('table_videos').innerHTML += html_table;
        script_color += highlightCode(script);
    }
    document.getElementById('total_videos').value = total;

    document.getElementById("insert_code").innerHTML += `[<br>${script_color}]`;
}

function highlightCode(code) {
    code = code.replace(/(".*?")/g, "<span class='string'>$1</span>");
    code = code.replace(/(var|obj|name|extension|acronimo|file_name|images_num|files_name|code|fecha|position| GO)/g, "<span class='keyword'>$1</span>");
    code = code.replace(/(\{|\})/g, "<span class='signos'>$1</span>");
    code = code.replace(/( 1| 2| 3 | 4| 5| 6| 7)/g, "<span class='number'>$1</span>");
    
    return code+"<br>";
}