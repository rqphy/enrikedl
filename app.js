const express = require('express');
const app = express();
const fs = require('fs');
const youtube = require('ytdl-core');
const dotenv = require('dotenv');

// if u change port - > change it in the index.js link too
const PORT = 3000;


app.use(express.static('views'));

app.get('/', (req,res) => {
    // res.send('Go to /dowload/:videoID');
    res.sendFile('index.html', {root: 'views' })
});

app.get('/download/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const URL = `https://www.youtube.com/watch?v=${videoId}`;
    // const info = await youtube.getInfo(videoId);
    // res.json(info);
    res.header("Content-Disposition", `attachment;filename=sound.mp3`)
    const video = youtube(URL, {quality: 'highestaudio', filter: 'audio'});
    video.on('info', (info) => {
        console.log(info);
        res.writeHead(200, {
            "Content-Disposition": `attachment;filename=${info.videoDetails.title.replace(/\s/g, '')}.mp4`,
            "Content-Type": "audio/mpeg",
        })
    });

    video.on('data', (data) => {
        res.write(data);
    });

    video.on('end', end => {
        console.log('Download end');
        res.end();
    })

    // youtube.downloadFromInfo(info);

    // res.writeHead(200, {
    //     "Content-Disposition": `attachment;filename=${info.videoDetails.title}`,
    //     "Content-Type": "video/mp4",
    // });
});

app.listen(PORT, (req, res) => {
    console.log("Server's running on port : ", PORT);
});