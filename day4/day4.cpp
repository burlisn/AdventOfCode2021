// day4.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#define BINGO true

bool readBoard(uint8_t bingoGrid[][5], std::fstream &file);

bool checkBingo(bool trueGrid[][5]);

int main()
{
    //Variable declaration
    std::fstream file1("input.txt");
    std::string numbersCalledString;
    int winningTurns = 2000;
    int winningTurns2 = 0;
    uint8_t bingoGrid[5][5] = {};
    uint8_t winningGrid[5][5] = {};
    uint8_t winningGrid2[5][5] = {};
    bool trueGrid[5][5] = {};
    bool trueWin[5][5] = {};
    bool trueWin2[5][5] = {};
    std::vector<uint8_t> numbersCalled;
    bool temp;
    int i;
    int win1 = 0;
    int win2 = 0;

    //Read numbers called into numbersCalled
    file1 >> numbersCalledString;
    temp = true;
    i=0;
    while(temp){
        if(numbersCalledString.find(",",i) == std::string::npos){ //If last element
            numbersCalled.push_back(stoi(numbersCalledString.substr(i)));
            temp = false;
        }
        else{
            numbersCalled.push_back(stoi(numbersCalledString.substr(i, numbersCalledString.find(",", i)-i)));
            i=numbersCalledString.find(",",i)+1;
        } 
    }

    while(readBoard(bingoGrid, file1)){
        //Find moves till bingo
        memset(trueGrid, 0, sizeof(trueGrid[0][0])*5*5);
        for(i=0; i<numbersCalled.size(); ++i){
            for(int j=0; j<25; ++j){
                if(numbersCalled[i]==bingoGrid[j/5][j%5]){
                    trueGrid[j/5][j%5] = true;
                    break;
                }
            }
            if(checkBingo(trueGrid)){
                if(winningTurns > i){
                    winningTurns = i;
                    memcpy(winningGrid, bingoGrid, 5*5*sizeof(uint8_t));
                    memcpy(trueWin, trueGrid, 5*5*sizeof(bool));
                }if(winningTurns2 < i){
                    winningTurns2 = i;
                    memcpy(winningGrid2, bingoGrid, 5*5*sizeof(uint8_t));
                    memcpy(trueWin2, trueGrid, 5*5*sizeof(bool));
                }
                break;
            }
        }
    }

    //Calculate winning val (part 1)
    for(i=0; i<25; ++i){
        if(!trueWin[i/5][i%5]){
            win1 += winningGrid[i/5][i%5];
        }
    }
    win1 *= numbersCalled[winningTurns];

    for(i=0; i<25; ++i){
        if(!trueWin2[i/5][i%5]){
            win2 += winningGrid2[i/5][i%5];
        }
    }
    win2 *= numbersCalled[winningTurns2];
    std::cout << win1 << std::endl;
    std::cout << win2 << std::endl;

    //Debugging & printing
    for(i=0; i<25; ++i){
        std::cout << static_cast<int>(winningGrid[i/5][i%5]) << " ";
    }
}

bool readBoard(uint8_t bingoGrid[][5], std::fstream &file){
    std::string inputString = "";
    for(int i=0; i<25; ++i){
        if(!(file >> inputString)){
            return false;
        }
        bingoGrid[i/5][i%5] = stoi(inputString);
    }
    return true;
}

bool checkBingo(bool trueGrid[][5]){
    int ctr=0;
    for(int i=0; i<5; ++i){
        ctr=0;
        for(int j=0; j<5; ++j){
            if(!trueGrid[i][j]){
                break;
            }
            ++ctr;
        }
        if(ctr==5){
            return BINGO;
        }
    }

    for(int i=0; i<5; ++i){
        ctr=0;
        for(int j=0; j<5; ++j){
            if(!trueGrid[j][i]){
                break;
            }
            ++ctr;
        }
        if(ctr==5){
            return BINGO;
        }
    }

    return false;
}

// Run program: Ctrl + F5 or Debug > Start Without Debugging menu
// Debug program: F5 or Debug > Start Debugging menu

// Tips for Getting Started: 
//   1. Use the Solution Explorer window to add/manage files
//   2. Use the Team Explorer window to connect to source control
//   3. Use the Output window to see build output and other messages
//   4. Use the Error List window to view errors
//   5. Go to Project > Add New Item to create new code files, or Project > Add Existing Item to add existing code files to the project
//   6. In the future, to open this project again, go to File > Open > Project and select the .sln file
