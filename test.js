const os = require('os')

const shell = require('shelljs')
const homeDir = os.userInfo().homedir


// shell.mv('*.mp3', 'mv')



const routes = {
    downloads: `${homeDir}/Downloads`,
    programs: `${homeDir}/Programs`,
    documents: `${homeDir}/Documents`,
    images: `${homeDir}/Images`,
    music: `${homeDir}/Music`,
    video: `${homeDir}/Video`,
    games: `${homeDir}/Games`,
    notes: `${homeDir}/Notes`
}

const extensions = {
    downloads: [],
    programs: ['exe', 'appimage', 'deb', 'rpm'],
    documents: ['pdf', 'docx', 'doc', 'ppt', 'pps', 'xls', 'xlsx'],
    images: ['tiff', 'tif', 'jpeg', 'gif', 'eps', 'svg'],
    music: ['mp3', 'ogg', 'wma', 'pcm', 'wav', 'flac', 'mid'],
    video: ['avi', 'mov', 'wmv', 'mp4', '3gp', '3g2', 'flv', 'mkv', 'rm'],
    games: [],
    notes: ['txt']
}

Object.keys(extensions).forEach(item => {
    console.log(item + '=', extensions[item])
    shell.exec('sleep 1')
})

// extensions.programs.forEach(item => {
//     shell.mv(`*.${item}`, `${routes.programs}`)
// })