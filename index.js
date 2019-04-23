#!/usr/bin/env node
const program = require('commander');
const request = require('request');
const path = require('path');
const fs = require('fs');
const qs = require('qs');

class OnBJ {
    constructor(ip, axios){
        this.ip = ip;
        this.axios = axios;
        this.url = `http://${ip}:8080`;
    }

    async tree(){
        // let result = await r2(this.url+'/java/file/tree').json;
        return JSON.parse((await this.axios(this.route('/java/file/tree'))).data);
    }

    async info(){
        return (await this.axios(this.route('/js/rcInfo.json'))).data;
    }

    async getFile(path){
        return (await this.axios(this.route('/java/file/get', path))).data;
    }

    async saveFile(path, source){
        return (await this.axios({
            method: 'post',
            url: this.route('/java/file/save', path),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({data: source})
        })).data;
    }

    async deleteFile(...paths){
        return (await this.axios({
            method: 'post',
            url: this.route('/java/file/delete', path),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: `delete=[${paths.map((p)=>`"${p}"`).join(',')}]`
        })).data;
    }

    async downloadZip(source, zip_destination){
         let response = await this.axios({
             method: 'get',
             url: this.route('/java/file/download', source),
             responseType: 'stream'
         });
        response.data.pipe(fs.createWriteStream(zip_destination));
    }

    async ping(name){
        return (await this.axios({
            method: 'post',
            url: this.route('/ping'),
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify({name: name})
        })).data
    }

    async build(){
        //TODO: check status before building and handle possibility of build already running
        let startTime = (await this.axios(this.route('/java/build/start'))).data;
        let log = (await this.axios(this.route('/java/build/wait'))).data;
        let status = (await this.axios(this.route('/java/build/status'))).data;
        return {
            startTime,
            log,
            status
        }
    }

    route(route, f){
        return this.url+route+(f? '?f='+f : '');
    }
}

module.exports = (ip='192.168.49.1', axios = require('axios')) => new OnBJ(ip, axios);