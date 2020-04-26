const os = require('os');
const fs = require('fs');
const shell = require('shelljs');
const inquirer = require('inquirer');
const chalk = require('chalk');

const homeDir = os.userInfo().homedir
const currentDir = shell.pwd().stdout
const pcName = os.hostname()

//console.log('name') => 'Name'.
const username = os.userInfo().username
const UserName = username.charAt(0).toUpperCase() + username.slice(1)

const folders = ['Downloads', 'Programs', 'Documents', 'Images', 'Music', 'Video', 'Games', 'Notes', 'Logs']
var createdFolder = false

//Functions
function sleep(seconds) {
    shell.exec(`sleep ${seconds}`)
}

function moveFiles(folder, extension) {
    shell.mv(`*.${extension} ${folder}`)
}

function verifyFolderAndCreate(NewFolder = null) {
    
    if (NewFolder != null) {
        folders.push(NewFolder)
    }
    
    let currentFolder = shell.pwd().stdout

    shell.cd()

    folders.forEach(item => {
        const createCode = shell.exec(`mkdir ${item} > /dev/null 2>&1`).code

        if (createCode == 0) {
            console.log(chalk.green.bold(`Criando pasta ${item}...`))
            sleep(0.1)
            console.log(chalk.green.bold(`Pasta ${item} criada.`))
            createdFolder = true
        } else {
            console.log(chalk.grey.italic(`Pasta ${item} já existe.`))
            sleep(0.1)
        }

    })

    shell.cd(`${currentFolder}`)
    
}

function organizerFiles() {  
    //Criar arquivos com todas as extensões de cada pastas,
    //for criada para que possa ser criado novos arquivos com novas extensoes personalizadas
    //pelo usuário, será mais facil para adicionar novas extensoes e novas pastas,
    //o programa ao mover as pasta de deve ler o arquivo com as extensoes e mover para suas,
    //pastas

    const extensions = {
        Downloads: [],
        Programs: ['exe', 'appimage', 'deb', 'rpm'],
        Documents: ['pdf', 'docx', 'doc', 'ppt', 'pps', 'xls', 'xlsx'],
        Images: ['tiff', 'tif', 'jpeg', 'gif', 'eps', 'svg', 'png'],
        Music: ['mp3', 'ogg', 'wma', 'pcm', 'wav', 'flac', 'mid'],
        Video: ['avi', 'mov', 'wmv', 'mp4', '3gp', '3g2', 'flv', 'mkv', 'rm'],
        Games: [],
        Notes: ['txt']
    }

    const routes = {
        Downloads: `${homeDir}/Downloads`,
        Programs: `${homeDir}/Programs`,
        Documents: `${homeDir}/Documents`,
        Images: `${homeDir}/Images`,
        Music: `${homeDir}/Music`,
        Video: `${homeDir}/Video`,
        Games: `${homeDir}/Games`,
        Notes: `${homeDir}/Notes`
    }

    Object.keys(extensions).forEach(itemExtensions => {
        // console.log(itemExtensions)
        // console.log(extensions[itemExtensions])
                
    })
    

            
    

}


//Code
console.log(chalk.blue.bold(`Bem vindo, ${UserName}.`))

inquirer.prompt([
    {
        type: 'confirm',
        name: 'Organizar',
        message: `Deseja organizar seus arquivos?`,
    },
]).then(resposta => {
    //console.info('Resposta:', resposta.Organizar)
    if (resposta.Organizar === false) {
        console.log(chalk.yellow.bold(`Poxa, infelizmente eu só sei fazer isso.`))
        sleep(1)
        console.log(chalk.red.bold(`Finalizando o programa...`))
        return
    }

    console.log(chalk.yellow.bold(`Primeiro vamos criar as pastas necessárias para a organização dos arquivos \n`))
    sleep(1)
    console.log(chalk.green.bold(`Verificando se as pastas já existem...`))
    verifyFolderAndCreate()

    if(createdFolder === true){
        console.log(chalk.black.bold.bgWhite('Verficação e criação, completa.'))
    }else{
        console.log(chalk.green.bold.bgBlack('Verficação completa.'))
    }

    
    inquirer.prompt([
        {
            type: 'list',
            name: 'comoOrganizar',
            message: 'Qual pasta deseja organizar?',
            choices: [
                `   Organizar somente a pasta em que você está agora?(${currentDir})`,
                //Funcionalidade para verificar se a pasta é um projeto React, React-Native ou NodeJs(Em Breve)
                //Funcinalidade adicionar extensão de arquivo e pasta onde ele deve ser movido.
                `   Organizar Pasta principal do computador?(${homeDir})`,
                `   Adicionar pasta e tipo de arquivo`,
                `   Sair...`
            ]
        }
    ]).then(resposta => {
        switch (resposta.comoOrganizar) {
            case `   Organizar somente a pasta em que você está agora?(${currentDir})`:
                    organizerFiles()
                break;
            case `   Organizar Pasta principal do computador?(${homeDir})`:
                console.log('op 2')
                break;
            case `   Sair...`:
                console.log(chalk.red.bold('Saindo...'))
                sleep(1)
                break;
            case `   Adicionar pasta e tipo de arquivo`:
                console.log('Adicionar pasta')
                break;
            default:
                break;
        }

    })
})
