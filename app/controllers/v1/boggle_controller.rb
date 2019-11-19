require 'set'

class V1::BoggleController < ApplicationController

  @@dice = [
    'RIFOBX',
    'IFEHEY',
    'DENOWS',
    'UTOKND',
    'HMSRAO',
    'LUPETS',
    'ACITOA',
    'YLGKUE',
    'QBMJOA',
    'EHISPN',
    'VETIGN',
    'BALIYT',
    'EZAVND',
    'RALESC',
    'UWILRG',
    'PACEMD'
  ]

  def cells4(gen)
    remaining = (0 .. 15).to_a
    return (1 .. 4).map{ |y| (1 .. 4).map{ |x|
      i = gen.rand(remaining.size())
      di = remaining[i]
      remaining.delete(i)
      normalize(@@dice[di][rand(6)])
    }}

  end

  def cells(n, gen)
    return (1 .. n).map{ |y| (1 .. n).map{ |x| normalize((65 + gen.rand(26)).chr) }}
  end

  def normalize(cell)
    return cell == 'Q' ? 'Qu' : cell
  end

  def genBoard
    seed = params[:seed].to_i
    gen = seed == 0 ? Random.new : Random.new(seed)

    n = params[:size].to_i
    if (n == 0)
      n = 4
    end

    cells = n == 4 ? cells4(gen)
      : cells(n, gen)

    render json: {
      :board => {
        :size => n,
        :cells => cells
      }
    }
  end

  def checkWord
    id = params[:id]
    word = params[:word]
    board = params[:board]
    size = params[:size]

    if (!isDictionaryWord(word))
      result = 'NOT_A_WORD'
    elsif (!isOnBoard(word, board, size.to_i))
      result = 'NOT_ON_BOARD'
    else
      score = getScore(word)
      result = score == 0 ? 'TOO_SHORT' : 'VALID'
    end

    render json: {
      :id => id,
      :result => result,
      :score => score,
      :word => word
    }
  end

  def getScore(word)
    n = word.length
    return n <= 2 ? 0
      : n <= 4 ? 1
      : n == 5 ? 2
      : n == 6 ? 3
      : n == 7 ? 5
      : 11
  end



  def readWords(path)
    words = Set.new
    File.readlines(path).each do |word|
      words.add(word.strip.downcase)
    end
    return words
  end

  @@words = nil
  def isDictionaryWord(word)
    if (@@words == nil)
      @@words = readWords("#{Rails.root}/db/data/words.txt")
    end
    return @@words.include?(word.downcase)
  end


  def denormalize(word)
    return word.gsub(/QU/, 'Q')
  end


  def isOnBoard(word, board, size)
    raise "board size is wrong" unless board.size() == size * size

    cells = board.scan(/.{#{size}}/).map{ |row|
      row.split('').map {
        |c| normalize(c).upcase
      }
    }

    result = false
    cells.each_with_index { |row, y|
        row.each_with_index { |cell, x|
            result = isOnBoard_(size, cells, word, [], y, x)
            break if result
        }
        break if result
    }

    return result
  end

  def isOnBoard_(n, cells, word, used, y, x)
    if word == ''
      return true
    end

    if x < 0 || y < 0 || x >= n || y >= n
      return false
    end

    if used.include? [y, x]
      return false
    end

    cell = cells[y][x]
    if !word.starts_with?(cell)
      return false
    end

    word_ = word[cell.length .. -1]
    used.push([y, x])

    result = isOnBoard_(n, cells, word_, used, y-1, x-1) ||
           isOnBoard_(n, cells, word_, used, y-1, x  ) ||
           isOnBoard_(n, cells, word_, used, y-1, x+1) ||
           isOnBoard_(n, cells, word_, used, y  , x-1) ||
           isOnBoard_(n, cells, word_, used, y  , x+1) ||
           isOnBoard_(n, cells, word_, used, y+1, x-1) ||
           isOnBoard_(n, cells, word_, used, y+1, x  ) ||
           isOnBoard_(n, cells, word_, used, y+1, x+1)

    used.pop()

    return result
  end
end
