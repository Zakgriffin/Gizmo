import JSZip from 'jszip'

// export default class FileStructure {

// }
export function downloadFolder() {
    let fileName = 'mhm'
    let zip = new JSZip()
    let photoZip = zip.folder('photos/ok')
    photoZip.file('README.txt', 'a folder with photos')
    let thing = zip.folder('thing')
    let thing2 = thing.file('')
    thing.file('uh.txt', 'ok then')

    zip.generateAsync({type: 'uint8array'}).then(thing => {
        const blob = new Blob([thing])
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName + '.zip'
        link.click()
    })
}