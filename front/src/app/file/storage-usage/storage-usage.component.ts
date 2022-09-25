import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { FileService } from '../file.service';
import { Chart, registerables } from 'chart.js';

@Component({
    selector: 'app-storage-usage',
    templateUrl: './storage-usage.component.html',
    styleUrls: ['./storage-usage.component.scss']
})
export class StorageUsageComponent implements OnInit {

    constructor(
        private fileService: FileService
    ) {
    }

    ngOnInit(): void {
        Chart.register(...registerables);

        this.fileService.filesSubject.subscribe((files) => {
            if (files) {
                this.getUsedStorage(files);
                this.getLargestFiles(files);
                this.getMostPopularFilesUpload(files);
            }
        });
    }

    getUsedStorage(files: File[]) {
        const totalSize = File.getTotalSize(files);

        // Convert files size in percentage (5GB = 100%)
        const filesSizePercentage = Math.round(totalSize / 5000000000 * 100);

        new Chart('used-storage', {
            type: 'doughnut',
            data: {
                labels: ['Used storage', 'Total storage'],
                datasets: [{
                    data: [filesSizePercentage, 100],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                    ],
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Used storage',
                    }
                }
            }
        });
    }

    getLargestFiles(files: File[]) {
        // Get 10 largest files and sort files by size
        const largestFiles = files.sort((a, b) => b.size - a.size).slice(0, 10);

        new Chart('largest-files', {
            type: 'bar',
            data: {
                labels: largestFiles.map(file => file.name.slice(0, 10)),   /*Get 10 first char of name*/
                datasets: [{
                    label: 'File size',
                    data: largestFiles.map(file => file.size),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                    ]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Largest files',
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'File size (bytes)',
                            color: 'rgb(255, 99, 132)',
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'File name',
                            color: 'rgb(255, 99, 132)',
                        }
                    }
                }
            }
        });
    }

    getMostPopularFilesUpload(files: File[]) {
        // Count files.type
        const countFilesType = files.reduce((acc, file) => {
            acc[file.type] = (acc[file.type] || 0) + 1;
            return acc;
        }, {});

        new Chart('most-popular-files-uploaded', {
            type: 'pie',
            data: {
                labels: Object.keys(countFilesType),
                datasets: [{
                    label: 'File size',
                    data: Object.values(countFilesType),
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                    ]
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Most popular files uploaded',
                    }
                }
            }
        });
    }
}
