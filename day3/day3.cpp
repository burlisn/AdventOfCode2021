// day3.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <fstream>
#include <iostream>
#include <string>
#include <cmath>
#include <vector>

void zero_arr(int *bits, int size);

int main()
{
    std::fstream inputFile("input.txt");

    int lines{0};
    uint32_t gamma{0};
    uint32_t epsilon{0};
    uint32_t co2_val{0};
    uint32_t oxy_val{0};
    std::string val_string{""};
    std::vector<std::string> oxy;
    std::vector<std::string> co2;
    
    //Read first value to get size of array needed
    inputFile >> val_string;
    int *bits = new int[val_string.size()]{};

    do
    {
        oxy.push_back(val_string); co2.push_back(val_string);
        for(unsigned int i=0; i<val_string.size(); ++i){
            if(val_string[i]=='1'){
                ++bits[i];
            }
        }
        ++lines;
    }while(inputFile >> val_string);

    //Calculate gamma and epsilon
    for(int i=val_string.size()-1; i>=0; --i){
        if(bits[i]>500){
            gamma |= 1<<(val_string.size()-i-1);
        }else{
            epsilon |= 1<<(val_string.size()-i-1);
        }
    }

    std::cout << gamma << " " << epsilon << std::endl;
    std::cout << gamma * epsilon << std::endl;

    //Zero arr
    zero_arr(bits, val_string.size());
    int pos = 0;
    bool trimZeros;

    while(oxy.size() != 1){
        //Determine amount in each pos
        for(int i=0; i<oxy.size(); ++i){
            if(oxy[i][pos] == '1'){
                ++bits[pos];
            }
        }

        //Trim what?
        if(bits[pos]>=(oxy.size()-bits[pos])){
            trimZeros = true;
        }else{
            trimZeros = false;
        }

        //Trim bad
        for(int i=0; i<oxy.size();){
            if(trimZeros && oxy[i][pos]=='0'){
                oxy.erase(oxy.begin()+i);
            }else if(!trimZeros && oxy[i][pos]=='1'){
                oxy.erase(oxy.begin()+i);
            }else{
                ++i;
            }
        }
        ++pos;
    }
    
    std::cout << oxy[0] << std::endl;

    //Zero arr & pos
    pos = 0;
    zero_arr(bits, val_string.size());
    while(co2.size() != 1){
        //Determine amount in each pos
        for(int i=0; i<co2.size(); ++i){
            if(co2[i][pos] == '1'){
                ++bits[pos];
            }
        }

        //Trim what?
        if(bits[pos]<(co2.size()-bits[pos])){
            trimZeros = true;
        }else{
            trimZeros = false;
        }

        //Trim bad
        for(int i=0; i<co2.size();){
            if(trimZeros && co2[i][pos]=='0'){
                co2.erase(co2.begin()+i);
            }else if(!trimZeros && co2[i][pos]=='1'){
                co2.erase(co2.begin()+i);
            }else{
                ++i;
            }
        }
        ++pos;
    }

    std::cout << co2[0] << std::endl;

    //Calculate oxy and co2
    for(int i=0; i<val_string.size(); ++i){
        if(oxy[0][i]=='1'){
            oxy_val |= 1<<(val_string.size()-i-1);
        }
        if(co2[0][i]=='1'){
            co2_val |= 1<<(val_string.size()-i-1);
        }
    }

    std::cout << oxy_val << " " << co2_val << " " << oxy_val * co2_val << std::endl;
    
    delete [] bits;
    return 0;
}

void zero_arr(int *bits, int size){
    for(int i=0; i<size; ++i){
        bits[i]=0;
    }
    return;
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
