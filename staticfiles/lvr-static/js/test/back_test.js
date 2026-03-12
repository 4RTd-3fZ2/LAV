export function JsonVideos() {
    const data = [
        {
            "name": "music.. vibes",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "0G6Q9524S",
            "files_name": "music.._vibes-ES-0G6Q9524S-6_Sep_2024-pH-GO6",
            "fecha": "6_Sep_2024",
            "position": "pH",
            "images_num": 1,
            "GO": 6
        },
        {
            "name": "Chuko portatil",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "356L9K24X",
            "files_name": "Chuko_portatil-ES-356L9K24X-6_Sep_2024-pH-GO6",
            "fecha": "6_Sep_2024",
            "position": "pH",
            "images_num": 1,
            "GO": 6
        },
        {
            "name": "Dije estas que sigo",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "4U6596241",
            "files_name": "Dije_estas_que_sigo-ES-4U6596241-6_Sep_2024-pH-GO6",
            "fecha": "6_Sep_2024",
            "position": "pH",
            "images_num": 1,
            "GO": 6
        },
        {
            "name": "Os iban a matar a loh doh eh",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "0931F8L24F",
            "files_name": "Os_iban_a_matar_a_loh_doh_eh-ES-0931F8L24F-31_Ago_2024-pH-GO6",
            "fecha": "31_Ago_2024",
            "position": "pH",
            "images_num": 1,
            "GO": 6,
            "description": "true"
        },
        {
            "name": "pues damelo pa mi Que poco trabajas",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "SJ30J8924P",
            "files_name": "pues_damelo_pa_mi_Que_poco_trabajas-ES-SJ30J8924P-30_Ago_2024-pH-GO6",
            "fecha": "30_Ago_2024",
            "position": "pH",
            "images_num": 1,
            "GO": 6
        },
        {
            "name": "Con piensoo di que si",
            "extension": ".mp4",
            "acronimo": "ES",
            "code": "CK14E9X24O",
            "files_name": "Con_piensoo_di_que_si-ES-CK14E9X24O-14_Sep_2024-pH-GO6",
            "fecha": "14_Sep_2024",
            "position": "pH",
            "images_num": 2,
            "GO": 6
        },
    ];

    return data;
}

export async function BackObtainDescription(path, files_name) {

    try {
        const response = await fetch(`${path}/descriptions/${files_name}.md`);
        const markdown = await response.text();
        return markdown;
    } catch (error) {
        console.error('Error al obtener la descripción:', error);
        throw error; // opcional: re-lanzar el error para manejarlo en otro lugar si es necesario
    }
}